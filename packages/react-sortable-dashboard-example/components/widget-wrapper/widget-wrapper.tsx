import { FC, PropsWithChildren, RefObject } from "react";
import { Drag } from "../icons/drag";
import styles from "./widget-wrapper.module.css";

export interface WidgetWrapperProps {
  dragTriggerRef: RefObject<Element>;
}

export const WidgetWrapper: FC<PropsWithChildren<WidgetWrapperProps>> = (
  props
) => {
  const { dragTriggerRef, children } = props;
  return (
    <div className={styles.root}>
      <Drag ref={dragTriggerRef} className={styles.dragTrigger} />
      <div className={styles.widgetWrapper}>{children}</div>
    </div>
  );
};
