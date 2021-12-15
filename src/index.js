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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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

  handleClick(i) {
    // Immutable 带来的好处

    // 1. 复杂的功能会变得更简单
    // 实现编辑历史这样复杂的功能会更加容易
    // 因为不可变性保证我们可以轻松知道一个状态的上一个状态值

    // 2. 变更检测
    // 可变数据的变更检测是比较困难的，可变对象的变更检测需要完整遍历对象和对象上一个值得完整拷贝
    // 而不可变对象就比较简单，因为对象和其上一个值是不同的引用值

    // 3. 更好判断何时需要重新渲染

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
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((state, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        // key 看起来像是属于 props，但事实上并不能通过 this.props.key 来访问，并且 React 也没有提供其他方式来访问 key
        // 如果没有手动提供 key，React 会抛出一个警告并且使用数组索引作为 key 值，这种情况下对于有重新排序、插入或者删除需求的列表渲染会存在问题
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
            onClick={(i) => this.handleClick(i)}
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
