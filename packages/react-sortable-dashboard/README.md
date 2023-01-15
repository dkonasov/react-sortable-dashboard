
# React sortable dashboard &middot; [![npm](https://img.shields.io/npm/v/react-sortable-dashboard)](https://www.npmjs.com/package/react-sortable-dashboard)

React library for building modern dashboards with drag-n-drop sorting


## Links

 - [Demo](https://react-sortable-dashboard-dkonasov.vercel.app)

## Usage

```tsx
import { Dashboard, DashboardWidget } from "react-sortable-dashboard";

const handleWidgetsReorder = (source: number, target: number) => {
  // ... do some stuff with source and target index
};

function App() {
  const widgets = ...; // Array of some widget objects

  return (
    <Dashboard rows={5} columns={5} onWidgetsReorder={handleWidgetsReorder}>
      { widgets.map((widget) => (
        <DashboardWidget
              columns={widget.columns}
              rows={widget.rows}
              key={widget.id}
              dragRef={dragTriggerRef}>
              <SomeWidgetComponent />
        </DashboardWidget>
      ))}
    </Dashboard>
  );
}
```


## API Reference

#### Dashboard

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rows` | `number` | **Required**. Total number of rows available for widgets on this dashboard |
| `columns` | `number` | **Required**. Total number of columns available for widgets on this dashboard |
| `verticalSpacing` | `number` | Space in pixels, that will be added between columns |
| `horizontalSpacing` | `number` | Space in pixels, that will be added between rows |
| `onWidgetsReorder` | `(source: number, target: number) => void` | handler for event that fires when order of widgets was changed via drag and drop |

#### DashboardWidget

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rows` | `number` | **Required**. Number of rows occupied by widget |
| `columns` | `number` | **Required**. Number of columns occupied by widget |
| `dragRef` | `RefObject<HTMLElement>` | Ref to widget child, that triggers drag and drop interaction

