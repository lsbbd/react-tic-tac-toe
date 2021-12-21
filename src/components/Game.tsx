import React, { useState } from "react";
import { calculateWinner } from "../utils";
import Board from "./Board";

export function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  let status: string;
  if (winner) {
    status = `Winner: ` + winner;
  } else {
    status = `Next player: ` + (xIsNext ? "X" : "O");
  }

  const move = (i: number) => {
    const history1 = history.slice(0, stepNumber + 1);
    const squares = history1[history1.length - 1].slice();
    const winner = calculateWinner(squares);
    const hasFilled = !!squares[i];
    if (winner || hasFilled) return;
 
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history1.concat([squares]));
    setXIsNext((value) => !value);
    setStepNumber(history1.length);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((state, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {move === stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={move} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}