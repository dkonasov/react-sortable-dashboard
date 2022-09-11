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
      <div>
        <label htmlFor={`type-${widget.id}`}>Type</label>
        <Select
          id={`type-${widget.id}`}
          value={widget.type}
          options={["stonks", "scoreboard", "map"]}
          onValueChange={onTypeChange}
        />
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
      <Button type="button" disabled={totalWidgets === 1} onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};
