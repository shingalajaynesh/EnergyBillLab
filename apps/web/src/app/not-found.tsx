import Button from 'antd/es/button';
import Result from 'antd/es/result';

import { PageContainer } from '@/components/page-container';

export default function NotFound() {
  return (
    <PageContainer narrow>
      <Result
        status="404"
        title="Page not found"
        subTitle="The page may have moved, or the Energy Bill Lab route has not been published yet."
        extra={
          <Button type="primary" href="/">
            Return home
          </Button>
        }
      />
    </PageContainer>
  );
}
