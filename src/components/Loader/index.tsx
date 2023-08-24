import styles from "./loader.module.less";

export const Loader = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
      <div className={styles.content_dot}></div>
    </div>
  );
};
