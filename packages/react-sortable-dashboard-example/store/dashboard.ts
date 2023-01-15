import { createEvent, createStore } from "effector";

export const updateRows = createEvent<number>();
export const updateColumns = createEvent<number>();
export const updateHorizontalSpacing = createEvent<number>();
export const updateVerticalSpacing = createEvent<number>();

export const $rows = createStore(2).on(updateRows, (_, payload) => payload);
export const $columns = createStore(3).on(
  updateColumns,
  (_, payload) => payload
);
export const $horizontalSpacing = createStore(18).on(
  updateHorizontalSpacing,
  (_, payload) => payload
);
export const $verticalSpacing = createStore(28).on(
  updateVerticalSpacing,
  (_, payload) => payload
);
