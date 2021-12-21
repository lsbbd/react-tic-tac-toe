import React from "react";
import { useGame } from "../hooks/useGame";
import Board from "./Board";

export function Game() {
  const { history, stepNumber, jumpTo, move, current, status } = useGame();

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
