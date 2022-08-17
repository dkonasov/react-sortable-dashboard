export type WidgetType = "stonks" | "scoreboard" | "map";

export type Widget = {
  id: number;
  type: WidgetType;
  columns: number;
  rows: number;
};
