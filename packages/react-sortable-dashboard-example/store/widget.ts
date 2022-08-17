import { createEvent, createStore, sample } from "effector";
import { Widget } from "../types/widget";
import { move } from "ramda";

export const updateWidget = createEvent<Widget>();
export const createWidget = createEvent();
export const deleteWidget = createEvent<Widget>();
export const moveWidget = createEvent<[number, number]>();
const initialWidgets: Widget[] = [
  {
    id: 0,
    type: "stonks",
    columns: 1,
    rows: 1,
  },
  {
    id: 1,
    type: "scoreboard",
    columns: 1,
    rows: 1,
  },
  {
    id: 2,
    type: "map",
    columns: 1,
    rows: 1,
  },
];

const initialMaxId = Math.max(...initialWidgets.map((val) => val.id));

export const $widgets = createStore<Widget[]>(initialWidgets);

const $lastId = createStore(initialMaxId).on(createWidget, (state) => ++state);

$widgets
  .on(updateWidget, (store, payload) => {
    const index = store.findIndex((elem) => elem.id === payload.id);
    store[index] = payload;
    return store.slice();
  })
  .on(deleteWidget, (store, payload) => {
    const index = store.findIndex((elem) => elem.id === payload.id);
    const result = store.slice();
    result.splice(index, 1);

    return result;
  })
  .on(moveWidget, (store, payload) => {
    const [source, target] = payload;

    return move(source, target, store);
  });

sample({
  clock: createWidget,
  source: [$widgets, $lastId],
  fn: ([widgets, lastId]) =>
    (widgets as Widget[]).concat({
      id: lastId as number,
      type: "stonks",
      columns: 1,
      rows: 1,
    }),
  target: $widgets,
});
