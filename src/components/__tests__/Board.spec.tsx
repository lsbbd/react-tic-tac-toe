/* eslint-disable testing-library/no-unnecessary-act */
import pretty from "pretty";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Board from "../Board";
import Clock from "../Clock";

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

it("should render board correctly", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Board squares={["X", "O", "X"]} onClick={onClick} />, container);
  });

  expect(pretty(container!.innerHTML)).toMatchInlineSnapshot(`
"<div>
  <div class=\\"board-row\\"><button class=\\"square\\">X</button><button class=\\"square\\">O</button><button class=\\"square\\">X</button></div>
  <div class=\\"board-row\\"><button class=\\"square\\"></button><button class=\\"square\\"></button><button class=\\"square\\"></button></div>
  <div class=\\"board-row\\"><button class=\\"square\\"></button><button class=\\"square\\"></button><button class=\\"square\\"></button></div>
</div>"
`);
});
