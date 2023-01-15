import { useEvent, useStore } from "effector-react";
import { ChangeEvent } from "react";
import {
  $columns,
  $horizontalSpacing,
  $rows,
  $verticalSpacing,
  updateColumns,
  updateHorizontalSpacing,
  updateRows,
  updateVerticalSpacing,
} from "../../store/dashboard";
import { NumericInput } from "../numeric-input/numeric-input";
import styles from "./dashboard-settings.module.css";

const onRowsChange = (value: number) => {
  updateRows(value);
};

const onColumnsChange = (value: number) => {
  updateColumns(value);
};

export const DashboardSettings = () => {
  const rows = useStore($rows);
  const columns = useStore($columns);
  const onHorizontalSpacingChange = useEvent(updateHorizontalSpacing);
  const onVerticalSpacingChange = useEvent(updateVerticalSpacing);

  const horizontalSpacing = useStore($horizontalSpacing);
  const verticalSpacing = useStore($verticalSpacing);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Dashboard settings</h2>
      <div className={styles.row}>
        <label htmlFor="rows" className={styles.label}>
          Rows
        </label>
        <NumericInput
          value={rows}
          id="rows"
          onValueChange={onRowsChange}
          min={1}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="columns" className={styles.label}>
          Colowns
        </label>
        <NumericInput
          value={columns}
          id="columns"
          onValueChange={onColumnsChange}
          min={1}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="horizontalSpacing" className={styles.label}>
          Horizontal spacing
        </label>
        <NumericInput
          value={horizontalSpacing}
          id="horizontalSpacing"
          onValueChange={onHorizontalSpacingChange}
          min={0}
          className={styles.input}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="verticalSpacing" className={styles.label}>
          Vertical spacing
        </label>
        <NumericInput
          value={verticalSpacing}
          id="verticalSpacing"
          onValueChange={onVerticalSpacingChange}
          min={0}
          className={styles.input}
        />
      </div>
    </div>
  );
};
