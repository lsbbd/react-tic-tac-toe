import { useState } from "react";
import { calculateWinner } from "../utils";

export function useGame() {
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
    const historyUntilStep = history.slice(0, stepNumber + 1);
    const squares = historyUntilStep[historyUntilStep.length - 1].slice();
    const winner = calculateWinner(squares);
    const hasFilled = !!squares[i];
    if (winner || hasFilled) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyUntilStep.concat([squares]));
    setXIsNext((value) => !value);
    setStepNumber(historyUntilStep.length);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return { history, winner, status, stepNumber, current, move, jumpTo };
}
