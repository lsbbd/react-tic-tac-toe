import React, { MouseEventHandler, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Clock = React.lazy(() => import("./clock"));

class ErrorBoundary extends React.Component<
  { message: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <h1>{this.props.message ?? "Error happend"}</h1>;
  }
}

function Square(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  value: number;
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

function Board(props: { squares: number[]; onClick: Function }): JSX.Element {
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

class Game extends React.Component<
  {},
  {
    history: { squares: number[] }[];
    stepNumber: number;
    xIsNext: boolean;
  }
> {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  };

  jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // This syntax ensures `this` is bound within handleBoardClick
  // Warning: this is *experimental* syntax (public class syntax), enabled by default in `Create React App`
  handleBoardClick: (i: number) => void = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((state, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={this.jumpTo.bind(this, move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status: string;
    if (winner) {
      status = `Winner: ` + winner;
    } else {
      status = `Next player: ` + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleBoardClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <ErrorBoundary message="OMG! the clock can not load!">
        <Suspense fallback="loading...">
          <Clock />
        </Suspense>
      </ErrorBoundary>
      <Game />
    </div>
  );
}

function calculateWinner(squares: number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
