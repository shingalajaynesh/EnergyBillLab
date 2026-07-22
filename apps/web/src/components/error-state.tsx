import styles from './state-message.module.css';

export function ErrorState({ message, title }: { message: string; title: string }) {
  return (
    <section className={styles.state} aria-labelledby="error-state-title" role="alert">
      <h2 id="error-state-title">{title}</h2>
      <p>{message}</p>
    </section>
  );
}
