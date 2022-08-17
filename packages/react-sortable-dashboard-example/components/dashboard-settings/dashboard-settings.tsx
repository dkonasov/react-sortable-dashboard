import { useStore } from "effector-react";
import { ChangeEvent } from "react";
import {
  $columns,
  $rows,
  updateColumns,
  updateRows,
} from "../../store/dashboard";
import styles from "./dashboard-settings.module.css";

const onRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
  updateRows(Number(event.currentTarget.value));
};

const onColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
  updateColumns(Number(event.currentTarget.value));
};

export const DashboardSettings = () => {
  const rows = useStore($rows);
  const columns = useStore($columns);

  return (
    <div className={styles.root}>
      <h2>Dashboard settings</h2>
      <div>
        <label htmlFor="rows">Rows</label>
        <input type="number" value={rows} id="rows" onChange={onRowsChange} />
      </div>

      <div>
        <label htmlFor="colums">Colowns</label>
        <input
          type="number"
          value={columns}
          id="columns"
          onChange={onColumnsChange}
        />
      </div>
    </div>
  );
};
