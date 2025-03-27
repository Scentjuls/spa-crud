import { ReactElement } from "react";
import styles from "./Shemmer.module.css";

export const Shemmer = (): ReactElement => {
  return (
    <div className={styles.glimmerPanel}>
      <div className={styles.glimmerLines} />
      <div className={styles.glimmerLines} />
      <div className={styles.glimmerLines} />
    </div>
  );
};
