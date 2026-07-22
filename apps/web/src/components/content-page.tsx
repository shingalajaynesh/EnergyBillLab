import { DataSourceNote } from '@/components/data-source-note';
import { EditorialByline } from '@/components/editorial-byline';
import { LastUpdated } from '@/components/last-updated';
import { PageContainer } from '@/components/page-container';
import { PageHeader } from '@/components/page-header';
import { RelatedLinks } from '@/components/related-links';
import type { ContentPage } from '@/content/pages';

import styles from './content-page.module.css';

export function ContentPageView({
  page,
  showSourceNote = false,
}: {
  page: ContentPage;
  showSourceNote?: boolean;
}) {
  return (
    <PageContainer narrow>
      <PageHeader title={page.title} description={page.description} eyebrow="Trust foundation" />
      <EditorialByline />
      <LastUpdated date={page.updatedAt} />
      <div className={styles.article}>
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      {showSourceNote ? <DataSourceNote /> : null}
      <RelatedLinks links={page.related} />
    </PageContainer>
  );
}
