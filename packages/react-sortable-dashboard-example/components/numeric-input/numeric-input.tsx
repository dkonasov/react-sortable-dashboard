import { ChangeEvent, FC, HTMLAttributes, useCallback } from "react";
import { Arrow } from "../icons/arrow";
import { InputFrame } from "../input-frame/input-frame";
import styles from "./numeric-input.module.css";
import cx from "classnames";

export interface NumericInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  min?: number;
  onValueChange?: (value: number) => void;
}

export const NumericInput: FC<NumericInputProps> = (props) => {
  const { className, min, style, value, onValueChange, ...restProps } = props;

  const onIncrementValue = useCallback(() => {
    onValueChange(value + 1);
  }, [onValueChange, value]);

  const onDecrementValue = useCallback(() => {
    if (value > min) {
      onValueChange(value - 1);
    }
  }, [min, onValueChange, value]);

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const parsedValue = Number(event.currentTarget.value);

      if (isNaN(parsedValue) || parsedValue < min) {
        return;
      }

      onValueChange(parsedValue);
    },
    [min, onValueChange, value]
  );

  return (
    <InputFrame className={cx(className, styles.root)} style={style}>
      <input
        value={value}
        className={styles.input}
        onChange={handleValueChange}
        {...restProps}
      />
      <div
        role="button"
        aria-label="Increase value"
        onClick={onIncrementValue}
        className={styles.spinnerButton}
      >
        <Arrow />
      </div>
      <div
        role="button"
        aria-label="Decrease value"
        className={cx(styles.spinnerButton, styles.bottomButton)}
        onClick={onDecrementValue}
      >
        <Arrow className={styles.bottomArrow} />
      </div>
    </InputFrame>
  );
};
