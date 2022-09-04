import { useCallback } from "react";
import { ChangeEvent, FC } from "react";
import { deleteWidget, updateWidget } from "../../store/widget";
import { Widget, WidgetType } from "../../types/widget";
import { NumericInput } from "../numeric-input/numeric-input";
import styles from "./widget-settings.module.css";

export type WidgetSettingsProps = {
  widget: Widget;
  totalWidgets: number;
};

export const WidgetSettings: FC<WidgetSettingsProps> = (props) => {
  const { widget, totalWidgets } = props;

  const onTypeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateWidget({
        ...widget,
        type: event.currentTarget.value as WidgetType,
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
      <div>
        <label htmlFor={`type-${widget.id}`}>Type</label>
        <select
          id={`type-${widget.id}`}
          value={widget.type}
          onChange={onTypeChange}
        >
          <option>stonks</option>
          <option>scoreboard</option>
          <option>map</option>
        </select>
      </div>

      <div>
        <label htmlFor={`columns-${widget.id}`}>Columns</label>
        <NumericInput
          id={`columns-${widget.id}`}
          value={widget.columns}
          min={1}
          onValueChange={onColumnsChange}
        />
      </div>

      <div>
        <label htmlFor={`rows-${widget.id}`}>Rows</label>
        <NumericInput
          id={`rows-${widget.id}`}
          value={widget.rows}
          min={1}
          onValueChange={onRowsChange}
        />
      </div>
      <button type="button" disabled={totalWidgets === 1} onClick={onDelete}>
        Удалить
      </button>
    </div>
  );
};
