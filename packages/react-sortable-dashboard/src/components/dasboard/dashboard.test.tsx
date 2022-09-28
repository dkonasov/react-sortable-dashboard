import { render, unmountComponentAtNode } from "react-dom";
import client, { Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Dashboard } from "./dashboard";

let container: HTMLDivElement | null = null;
let root: Root | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = client.createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  root = null;
  container.remove();
  container = null;
});

describe("Dashboard component", () => {
  it("should render some root element", () => {
    act(() => {
      root.render(<Dashboard rows={1} columns={1}></Dashboard>);
    });
  });
});
