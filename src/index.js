import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Square 现在是一个受控组件，因为他的状态和行为都受到 Board 组件的控制
// Square 组件可以被进一步的简化为 Function Component，其具有以下特征：
// 1. 只包含一个 render 函数，没有自己的状态
// 2. 不需要使用 Class 来定义，而是通过函数来定义
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    // Immutable 带来的好处

    // 1. 复杂的功能会变得更简单
    // 实现编辑历史这样复杂的功能会更加容易
    // 因为不可变性保证我们可以轻松知道一个状态的上一个状态值

    // 2. 变更检测
    // 可变数据的变更检测是比较困难的，可变对象的变更检测需要完整遍历对象和对象上一个值得完整拷贝
    // 而不可变对象就比较简单，因为对象和其上一个值是不同的引用值

    // 3. 更好判断何时需要重新渲染

    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares, xIsNext: !this.state.xIsNext });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ` + winner;
    } else {
      status = `Next player: ` + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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

ReactDOM.render(<Game />, document.getElementById("root"));
