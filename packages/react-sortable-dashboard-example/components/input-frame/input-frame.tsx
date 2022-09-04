import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styles from "./input-frame.module.css";
import cx from "classnames";

export const InputFrame: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = (props) => {
  const { className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={cx(className, styles.root)}
      aria-hidden="true"
    ></div>
  );
};
