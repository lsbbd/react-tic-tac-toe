import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return <h2>{this.state.date.toLocaleTimeString()}</h2>;
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
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

  const renderSquare = (i) => (
    <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="board-row">
      {row.map(renderSquare)}
    </div>
  );

  const squares = getSquares();

  return <div>{squares.map(renderRow)}</div>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleBoardClick(i) {
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
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((state, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ` + winner;
    } else {
      status = `Next player: ` + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleBoardClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function App(props) {
  return (
    <div>
      <Clock />
      <Game />
    </div>
  );
}

function calculateWinner(squares) {
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
