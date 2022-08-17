import { FC } from "react";
import styles from "./scoreboard.module.css";

export const Scoreboard: FC = () => (
  <table className={styles.root}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Scores</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mike</td>
        <td>1001</td>
      </tr>
      <tr>
        <td>Sam</td>
        <td>5000</td>
      </tr>
      <tr>
        <td>Herbert</td>
        <td>42</td>
      </tr>
    </tbody>
  </table>
);
