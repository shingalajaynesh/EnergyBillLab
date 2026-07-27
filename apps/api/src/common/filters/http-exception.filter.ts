import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

export type SanitizedErrorLog = {
  timestamp: string;
  environment: string;
  path: string;
  statusCode: number;
  errorCategory: string;
  message: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { send: (body: unknown) => void };
    }>();
    const request = ctx.getRequest<{ url?: string; method?: string }>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawMessage =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    // Redact secret patterns
    const sanitizedMessage = this.redactSecrets(rawMessage);

    const category =
      status >= 500 ? 'SERVER_ERROR' : status >= 400 ? 'CLIENT_ERROR' : 'UNKNOWN_ERROR';

    const logEntry: SanitizedErrorLog = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      path: request?.url || 'unknown',
      statusCode: status,
      errorCategory: category,
      message: sanitizedMessage,
    };

    if (status >= 500) {
      this.logger.error(JSON.stringify(logEntry));
    } else {
      this.logger.warn(JSON.stringify(logEntry));
    }

    // Do NOT expose internal stack traces or raw errors in production
    const isProd = process.env.NODE_ENV === 'production';
    const clientResponse = {
      statusCode: status,
      errorCategory: category,
      message: isProd && status >= 500 ? 'Internal server error' : sanitizedMessage,
      timestamp: logEntry.timestamp,
      path: logEntry.path,
    };

    if (typeof response?.status === 'function') {
      response.status(status).send(clientResponse);
    }
  }

  public redactSecrets(input: string): string {
    if (!input) return input;
    return input
      .replace(/postgres:\/\/[^@]+@/gi, 'postgres://[REDACTED]@')
      .replace(/postgresql:\/\/[^@]+@/gi, 'postgresql://[REDACTED]@')
      .replace(/ebl_reval_sec_[a-zA-Z0-9]+/gi, '[REDACTED_SECRET]')
      .replace(/bearer\s+[a-zA-Z0-9._-]+/gi, 'Bearer [REDACTED_TOKEN]')
      .replace(/api[_-]?key[=:][a-zA-Z0-9._-]+/gi, 'api_key=[REDACTED]');
  }
}
