import { FC, PropsWithChildren } from "react";
import styles from "./input-frame.module.css";

export const InputFrame: FC<PropsWithChildren> = (props) => {
  return <div {...props} className={styles.root}></div>;
};
