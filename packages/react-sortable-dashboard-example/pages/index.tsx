import { useEvent, useStore } from "effector-react";
import { createRef, FC } from "react";
import { Dashboard, DashboardWidget } from "react-sortable-dashboard";
import { DashboardSettings } from "../components/dashboard-settings/dashboard-settings";
import { Stonks } from "../components/stonks/stonks";
import { WidgetsList } from "../components/widgets-list/widgets-list";
import { $widgets, moveWidget } from "../store/widget";
import { WidgetType } from "../types/widget";
import { Map } from "../components/map/map";
import { Scoreboard } from "../components/scoreboard/scoreboard";
import { $columns, $rows } from "../store/dashboard";
import { Main } from "../components/main/main";
import { Drag } from "../components/icons/drag";
import { WidgetWrapper } from "../components/widget-wrapper/widget-wrapper";

const Index = () => {
  const widgets = useStore($widgets);
  const widgetsComponents: Record<WidgetType, FC> = {
    stonks: Stonks,
    map: Map,
    scoreboard: Scoreboard,
  };
  const rows = useStore($rows);
  const columns = useStore($columns);
  const handleWidgetReorder = useEvent(moveWidget);

  return (
    <>
      <DashboardSettings />
      <h2>Widgets settings</h2>
      <Main>
        <WidgetsList />
        <Dashboard
          rows={rows}
          columns={columns}
          onWidgetsReorder={(source, target) =>
            handleWidgetReorder([source, target])
          }
        >
          {widgets.map((widget) => {
            const WidgetComponent = widgetsComponents[widget.type];
            const dragTriggerRef = createRef<Element>();

            return (
              <DashboardWidget
                columns={widget.columns}
                rows={widget.rows}
                key={widget.id}
                dragRef={dragTriggerRef}
              >
                <WidgetWrapper dragTriggerRef={dragTriggerRef}>
                  <WidgetComponent />
                </WidgetWrapper>
              </DashboardWidget>
            );
          })}
        </Dashboard>
      </Main>
    </>
  );
};

export default Index;
