import {
  FC,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import styles from "./input-frame.module.css";
import cx from "classnames";

export const InputFrame = forwardRef(
  (
    props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { className, ...restProps } = props;
    return (
      <div
        {...restProps}
        className={cx(className, styles.root)}
        aria-hidden="true"
        ref={ref}
      ></div>
    );
  }
);
