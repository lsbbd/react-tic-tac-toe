/* eslint-disable testing-library/no-unnecessary-act */
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Square from "../Square";
import pretty from "pretty";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

it("should render square", () => {
  act(() => {
    render(<Square value="1" />, container);
  });

  const button = container?.querySelector("button");

  expect(button?.innerHTML).toBe("1");

  expect(pretty(container!.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"square\\">1</button>"`
  );

  act(() => {
    render(<Square value="2" />, container);
  });

  expect(pretty(container!.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"square\\">2</button>"`
  );
});

it("should emit click event", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Square value="1" onClick={onClick} />, container);
  });

  const button = container?.querySelector("button");

  act(() => {
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }

    expect(onClick).toHaveReturnedTimes(6);
  });
});
