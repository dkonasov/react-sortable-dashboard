import { createEvent, createStore } from "effector";

export const updateRows = createEvent<number>();
export const updateColumns = createEvent<number>();

export const $rows = createStore(2).on(updateRows, (_, payload) => payload);
export const $columns = createStore(5).on(
  updateColumns,
  (_, payload) => payload
);
