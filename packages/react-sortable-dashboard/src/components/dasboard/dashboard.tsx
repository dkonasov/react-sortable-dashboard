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
  children: ReactElement<DashboardWidgetProps>[];
  onWidgetsReorder?: (source: number, target: number) => void;
}

export const Dashboard: FC<DashboardProps> = (props) => {
  const { children, columns, onWidgetsReorder, rows } = props;
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
      setSquareSize(ref.current.clientWidth / columns);
    }
  }, [ref.current, columns]);

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
        result.push([coords[0] * squareSize, coords[1] * squareSize]);

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
    <div style={{ position: "relative" }} ref={ref}>
      {offsets.map((element, index) => (
        <WidgetRenderer
          style={{
            position: "absolute",
            top: element[0],
            left: element[1],
            width: squareSize * children[index].props.columns,
            height: squareSize * children[index].props.rows,
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
