import { FC, PropsWithChildren } from "react";
import styles from "./main.module.css";

export const Main: FC<PropsWithChildren> = (props) => (
  <div className={styles.root} {...props} />
);
