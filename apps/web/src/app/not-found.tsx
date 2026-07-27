import Button from 'antd/es/button';
import Result from 'antd/es/result';
import Space from 'antd/es/space';

import { PageContainer } from '@/components/page-container';

export default function NotFound() {
  return (
    <PageContainer narrow>
      <Result
        status="404"
        title="Page not found"
        subTitle="The page may have moved, or the Energy Bill Lab route has not been published yet."
        extra={
          <Space wrap align="center">
            <Button type="primary" href="/">
              Return Home
            </Button>
            <Button href="/electricity-rates">Electricity Rates</Button>
            <Button href="/tools">Calculators</Button>
            <Button href="/research">Research Reports</Button>
            <Button href="/guides">Guides</Button>
            <Button href="/comparisons">Comparisons</Button>
          </Space>
        }
      />
    </PageContainer>
  );
}
