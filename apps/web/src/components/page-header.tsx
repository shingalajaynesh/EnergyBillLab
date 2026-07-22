import styles from './page-header.module.css';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ description, eyebrow, title }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
