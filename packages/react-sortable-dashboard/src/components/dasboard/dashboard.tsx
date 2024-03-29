import {
  DragEvent,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WidgetRenderer } from "../widget-renderer/widget-renderer";
import { DashboardWidgetProps } from "../widget/dashboard-widget";

export interface DashboardProps {
  rows: number;
  columns: number;
  children?:
    | ReactElement<DashboardWidgetProps>[]
    | ReactElement<DashboardWidgetProps>;
  onWidgetsReorder?: (source: number, target: number) => void;
  horizontalSpacing?: number;
  verticalSpacing?: number;
}

const normilizeChildren = (
  children?:
    | ReactElement<DashboardWidgetProps>[]
    | ReactElement<DashboardWidgetProps>
): ReactElement<DashboardWidgetProps>[] => {
  let result: ReactElement<DashboardWidgetProps>[] | undefined;

  if (!children) {
    return [];
  }

  if (children && !Array.isArray(children)) {
    return [children];
  }

  return children as ReactElement<DashboardWidgetProps>[];
};

export const Dashboard: FC<DashboardProps> = (props) => {
  const {
    columns,
    onWidgetsReorder,
    rows,
    horizontalSpacing = 0,
    verticalSpacing = 0,
  } = props;
  const children = normilizeChildren(props.children);

  const [squareSize, setSquareSize] = useState(0);
  const [source, setSource] = useState(-1);
  const ref = useRef<HTMLDivElement>();

  const handleDrop = useCallback(
    (target: number) => {
      if (source === -1) {
        return false;
      }

      onWidgetsReorder(source, target);
    },
    [source, onWidgetsReorder]
  );

  const handleDragStart = useCallback(
    (index: number) => {
      setSource(index);
    },
    [setSource]
  );

  const handleDragEnd = useCallback(() => {
    setSource(-1);
  }, [setSource]);

  useEffect(() => {
    if (ref.current) {
      setSquareSize(
        (ref.current.clientWidth - verticalSpacing * (columns - 1)) / columns
      );
    }
  }, [ref.current, columns, verticalSpacing]);

  const offsets = useMemo(() => {
    const field = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(false));
    const result: [number, number][] = [];
    const coords = [0, 0]; // [ row, column ]
    let currentChildIndex = 0;

    while (
      currentChildIndex < children.length &&
      rows - coords[0] >= children[currentChildIndex].props.rows &&
      (coords[0] < rows - 1 ||
        coords[1] < columns - children[currentChildIndex].props.columns + 1)
    ) {
      const hasEnoughColumns =
        coords[1] < columns - children[currentChildIndex].props.columns + 1;
      if (
        hasEnoughColumns &&
        field
          .slice(coords[0], coords[0] + children[currentChildIndex].props.rows)
          .every((row) =>
            row
              .slice(
                coords[1],
                coords[1] + children[currentChildIndex].props.columns
              )
              .every((val) => !val)
          )
      ) {
        const offsetX =
          verticalSpacing > 0 && coords[1] > 0
            ? verticalSpacing * coords[1]
            : 0;
        const offsetY =
          horizontalSpacing > 0 && coords[0] > 0
            ? horizontalSpacing * coords[0]
            : 0;
        result.push([
          coords[0] * squareSize + offsetY,
          coords[1] * squareSize + offsetX,
        ]);

        field
          .slice(coords[0], coords[0] + children[currentChildIndex].props.rows)
          .forEach((row) => {
            row.splice(
              coords[1],
              children[currentChildIndex].props.columns,
              ...Array(children[currentChildIndex].props.columns).fill(true)
            );
          });

        coords[1] += children[currentChildIndex].props.columns;
        currentChildIndex++;
      } else {
        if (hasEnoughColumns) {
          coords[1] += children[currentChildIndex].props.columns;
        } else {
          coords[0]++;
          coords[1] = 0;
        }
      }
    }

    return result;
  }, [squareSize, children, rows, columns]);

  return (
    <div
      style={{
        position: "relative",
        height:
          squareSize > 0
            ? squareSize * rows + horizontalSpacing * (rows - 1)
            : undefined,
      }}
      ref={ref}
    >
      {offsets.map((element, index) => (
        <WidgetRenderer
          style={{
            position: "absolute",
            top: element[0],
            left: element[1],
            width:
              squareSize * children[index].props.columns +
              verticalSpacing * (children[index].props.columns - 1),
            height:
              squareSize * children[index].props.rows +
              horizontalSpacing * (children[index].props.rows - 1),
          }}
          dragRef={children[index].props.dragRef}
          onTriggerDragStart={() => {
            handleDragStart(index);
          }}
          onDragEnd={handleDragEnd}
          onDragOver={(event) => {
            if (source !== index) {
              event.preventDefault();
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            handleDrop(index);
          }}
        >
          {children[index].props.children}
        </WidgetRenderer>
      ))}
    </div>
  );
};
