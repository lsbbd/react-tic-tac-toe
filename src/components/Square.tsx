import { MouseEventHandler } from "react";

export default function Square(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  value: string;
}) {
  return (
    // - React events are named using camelCase, rather than lowercase
    // - With JSX you pass a function as the event handler, rather than string
    // - You can not return false to prevent default behavior in React. You must call `preventDefault` explicitly
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
