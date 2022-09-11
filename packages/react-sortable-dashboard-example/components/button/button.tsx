import { FC, HTMLAttributes } from "react";
import styles from "./button.module.css";
import cx from "classnames";

export const Button: FC<
  HTMLAttributes<HTMLButtonElement> & { type: "button"; disabled?: boolean }
> = (props) => {
  const { className, ...restProps } = props;

  return <button className={cx(styles.root, className)} {...restProps} />;
};
