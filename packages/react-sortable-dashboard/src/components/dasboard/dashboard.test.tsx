import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Dashboard } from "./dashboard";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Dashboard component", () => {
  it("should render some root element", () => {
    act(() => {
      render(<Dashboard rows={1} columns={1}></Dashboard>, container);
    });
  });
});
