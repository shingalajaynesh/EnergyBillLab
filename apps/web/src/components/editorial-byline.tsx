import styles from './editorial-byline.module.css';

export function EditorialByline({ reviewedBy }: { reviewedBy?: string }) {
  return (
    <p className={styles.byline}>
      Published by Energy Bill Lab editorial process
      {reviewedBy ? `; reviewed by ${reviewedBy}` : ''}.
    </p>
  );
}
