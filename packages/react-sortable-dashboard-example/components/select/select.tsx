import { FC, HTMLAttributes, useCallback, useState } from "react";
import { DropdownTrigger } from "../icons/dropdown-trigger";
import { InputFrame } from "../input-frame/input-frame";
import cx from "classnames";
import styles from "./select.module.css";
import {
  flip,
  useFloating,
  useInteractions,
  useDismiss,
  useClick,
} from "@floating-ui/react-dom-interactions";
import { offset, size } from "@floating-ui/core";
import { createPortal } from "react-dom";
import { CheckMark } from "../icons/checkmark";

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

export const Select: FC<SelectProps> = (props) => {
  const { value, options, onValueChange, className, ...restProps } = props;
  const [open, onOpenChange] = useState(false);

  const { context, x, y, reference, floating, strategy } = useFloating({
    middleware: [
      flip(),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
      offset(2),
    ],
    placement: "bottom-end",
    onOpenChange,
    open,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {}),
  ]);

  const handleOptionSelect = useCallback(
    (value: string) => {
      onValueChange(value);
      onOpenChange(false);
    },
    [onValueChange, onOpenChange]
  );

  const dropdown = open
    ? createPortal(
        <div
          ref={floating}
          className={styles.dropdown}
          {...getFloatingProps({
            style: { position: strategy, left: x ?? 0, top: y ?? 0 },
          })}
        >
          {options.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => handleOptionSelect(option)}
            >
              {option === value && <CheckMark className={styles.checkmark} />}
              <span>{option}</span>
            </div>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <InputFrame
        {...restProps}
        className={cx(className, styles.root)}
        ref={reference}
        {...getReferenceProps()}
      >
        <span>{value}</span>
        <DropdownTrigger />
      </InputFrame>
      {dropdown}
    </>
  );
};
