import { useCallback } from "react";
import { ChangeEvent, FC } from "react";
import { deleteWidget, updateWidget } from "../../store/widget";
import { Widget, WidgetType } from "../../types/widget";
import { Button } from "../button/button";
import { NumericInput } from "../numeric-input/numeric-input";
import { Select } from "../select/select";
import styles from "./widget-settings.module.css";

export type WidgetSettingsProps = {
  widget: Widget;
  totalWidgets: number;
};

export const WidgetSettings: FC<WidgetSettingsProps> = (props) => {
  const { widget, totalWidgets } = props;

  const onTypeChange = useCallback(
    (value: string) => {
      updateWidget({
        ...widget,
        type: value as WidgetType,
      });
    },
    [widget]
  );

  const onColumnsChange = useCallback(
    (value: number) => {
      updateWidget({ ...widget, columns: value });
    },
    [widget]
  );

  const onRowsChange = useCallback(
    (value: number) => {
      updateWidget({ ...widget, rows: value });
    },
    [widget]
  );

  const onDelete = useCallback(() => {
    deleteWidget(widget);
  }, [widget]);

  return (
    <div className={styles.root}>
      <div className={styles.typeBlock}>
        <label htmlFor={`type-${widget.id}`} className={styles.typeLabel}>
          Type
        </label>
        <Select
          id={`type-${widget.id}`}
          value={widget.type}
          options={["stonks", "scoreboard", "map"]}
          onValueChange={onTypeChange}
          className={styles.typeInput}
        />
      </div>
      <div className={styles.dimensionsBlock}>
        <label htmlFor={`columns-${widget.id}`} className={styles.columnLabel}>
          Columns
        </label>
        <NumericInput
          id={`columns-${widget.id}`}
          value={widget.columns}
          min={1}
          onValueChange={onColumnsChange}
          className={styles.columnInput}
        />

        <label htmlFor={`rows-${widget.id}`} className={styles.rowLabel}>
          Rows
        </label>
        <NumericInput
          id={`rows-${widget.id}`}
          value={widget.rows}
          min={1}
          onValueChange={onRowsChange}
          className={styles.rowInput}
        />
        <Button
          type="button"
          disabled={totalWidgets === 1}
          onClick={onDelete}
          className={styles.delete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
