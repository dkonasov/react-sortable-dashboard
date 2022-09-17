import { FC, ReactNode, RefObject } from "react";

export interface DashboardWidgetProps {
  columns: number;
  rows: number;
  children: ReactNode;
  dragRef?: RefObject<Element>;
}

export const DashboardWidget: FC<DashboardWidgetProps> = (_) => {
  return null;
};
