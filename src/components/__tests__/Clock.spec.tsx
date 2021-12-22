/* eslint-disable testing-library/no-unnecessary-act */
import pretty from "pretty";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Clock from "../Clock";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
  jest.useRealTimers();
});

it("should render now", () => {
  let now = new Date("2021-12-22 12:00");
  jest.setSystemTime(now);
  act(() => {
    render(<Clock />, container);
  });

  expect(pretty(container!.innerHTML)).toMatchInlineSnapshot(`"<h2>12:00:00 PM</h2>"`);
});

it("should change time text by time", () => {
  let now = new Date();
  act(() => {
    render(<Clock />, container);
  });

  const el = container?.querySelector("h2");

  act(() => {
    jest.advanceTimersByTime(50000);
  });

  expect(el?.innerHTML).not.toBe(now.toLocaleTimeString());
  expect(el?.innerHTML).toBe(new Date(+now + 50000).toLocaleTimeString());
});
