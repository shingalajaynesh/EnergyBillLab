import styles from './state-message.module.css';

export function EmptyState({ message, title }: { message: string; title: string }) {
  return (
    <section className={styles.state} aria-labelledby="empty-state-title">
      <h2 id="empty-state-title">{title}</h2>
      <p>{message}</p>
    </section>
  );
}
