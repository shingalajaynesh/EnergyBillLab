import styles from './last-updated.module.css';

export function LastUpdated({ date }: { date: string }) {
  const formatted = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));

  return (
    <p className={styles.updated}>
      Last updated <time dateTime={date}>{formatted}</time>
    </p>
  );
}
