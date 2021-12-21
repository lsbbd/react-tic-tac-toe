import Square from "./Square";

export default function Board(props: {
  squares: string[];
  onClick: Function;
}): JSX.Element {
  const getSquares = () => {
    let squares = [];
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(i);
      if ((i + 1) % 3 === 0) {
        squares.push(row);
        row = [];
      }
    }
    return squares;
  };

  const renderSquare = (i: number) => (
    <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  const renderRow = (row: number[], rowIndex: number) => (
    <div key={rowIndex} className="board-row">
      {row.map(renderSquare)}
    </div>
  );

  const squares = getSquares();

  return <div>{squares.map(renderRow)}</div>;
}
