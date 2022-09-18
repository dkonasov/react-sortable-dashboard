import { FC, PropsWithChildren } from "react";
import styles from "./dashboard-wrapper.module.css";

export const DashboardWrapper: FC<PropsWithChildren> = (props) => (
  <div className={styles.root} {...props} />
);
