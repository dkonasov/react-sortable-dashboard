import { useStore } from "effector-react";
import { $widgets, createWidget } from "../../store/widget";
import { AddButton } from "../add-button/add-button";
import { WidgetSettings } from "../widget-settings/widget-settings";
import styles from "./widgets-list.module.css";

export const WidgetsList = () => {
  const widgets = useStore($widgets);

  return (
    <div className={styles.root}>
      <h2>Widgets settings</h2>
      {widgets.map((widget) => (
        <WidgetSettings
          widget={widget}
          key={widget.id}
          totalWidgets={widgets.length}
        />
      ))}
      <div className={styles.addRow}>
        <AddButton type="button" onClick={() => createWidget()}>
          Add new widget
        </AddButton>
      </div>
    </div>
  );
};
