import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useState,
  DragEvent,
} from "react";

export interface WidgetRendererProps extends HTMLAttributes<HTMLDivElement> {
  dragRef?: RefObject<Element>;
  onTriggerDragStart?: (
    event: DragEvent<HTMLDivElement | SVGSVGElement>
  ) => void;
}

export const WidgetRenderer: FC<PropsWithChildren<WidgetRendererProps>> = (
  props
) => {
  const { dragRef, onTriggerDragStart, onDragEnd, ...restProps } = props;
  const [canDrag, setCanDrag] = useState(false);

  const clickListener = useCallback(() => {
    setCanDrag(true);
  }, [setCanDrag]);

  const dragStartListener = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!canDrag) {
        event.preventDefault();
        return;
      }

      onTriggerDragStart?.(event);
    },
    [canDrag]
  );

  const dragEndListener = useCallback(
    (event) => {
      setCanDrag(false);
      onDragEnd(event);
    },
    [onDragEnd, setCanDrag]
  );

  useEffect(() => {
    if (!dragRef?.current) {
      return;
    }

    dragRef.current.addEventListener("pointerdown", clickListener);

    return () =>
      dragRef.current?.removeEventListener("pointerdown", clickListener);
  }, [dragRef?.current, clickListener]);

  return (
    <div
      {...restProps}
      draggable
      onDragStart={dragStartListener}
      onDragEnd={dragEndListener}
    ></div>
  );
};
