import { Button, Col, Row, Space, Typography } from 'antd';
import Link from 'next/link';

import { PageContainer } from '@/components/page-container';

import styles from './page.module.css';

const priorityLinks = [
  {
    href: '/tools/electricity-bill-analyzer',
    title: 'Bill Analyzer',
    text: 'Foundation route reserved for the first calculator workflow.',
  },
  {
    href: '/electricity-rates',
    title: 'Electricity Rates',
    text: 'State rate pages will use validated official snapshots.',
  },
  {
    href: '/methodology',
    title: 'Methodology',
    text: 'Every estimate will show formulas, assumptions, and source dates.',
  },
];

export default function HomePage() {
  return (
    <PageContainer>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Typography.Title level={1}>
            Understand what changed in your energy bill.
          </Typography.Title>
          <Typography.Paragraph className={styles.lede}>
            Energy Bill Lab is being built as a transparent U.S. home-energy data product:
            calculators first, official source dates always, and no login wall for core answers.
          </Typography.Paragraph>
          <Space size="middle" wrap>
            <Button type="primary" size="large" href="/tools/electricity-bill-analyzer">
              Bill analyzer foundation
            </Button>
            <Button size="large" href="/data-sources">
              Data-source plan
            </Button>
          </Space>
        </div>
        <div className={styles.readinessPanel} aria-label="Foundation readiness summary">
          <span className={styles.panelLabel}>Phase 0 foundation</span>
          <dl>
            <div>
              <dt>Public app</dt>
              <dd>Next.js App Router</dd>
            </div>
            <div>
              <dt>API</dt>
              <dd>NestJS Fastify</dd>
            </div>
            <div>
              <dt>Contracts</dt>
              <dd>Zod boundary package</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="foundation-links">
        <Typography.Title id="foundation-links" level={2}>
          Built for calculators without starting them yet
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {priorityLinks.map((item) => (
            <Col key={item.href} xs={24} md={8}>
              <Link className={styles.linkCard} href={item.href}>
                <span>{item.title}</span>
                <small>{item.text}</small>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </PageContainer>
  );
}
