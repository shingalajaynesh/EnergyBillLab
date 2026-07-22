'use client';

import { Button, Result } from 'antd';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <Result
          status="500"
          title="Something went wrong"
          subTitle="Energy Bill Lab could not render this page. Try again, or return to the homepage."
          extra={[
            <Button key="retry" type="primary" onClick={reset}>
              Try again
            </Button>,
            <Button key="home" href="/">
              Return home
            </Button>,
          ]}
        />
      </body>
    </html>
  );
}
