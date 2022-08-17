import { FC, PropsWithChildren } from "react";
import styles from "./stack.module.css";

export const Stack: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <div className={styles.root}>{children}</div>;
};
