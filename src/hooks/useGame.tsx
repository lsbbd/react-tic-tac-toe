import { useMemo, useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/gameReducer";
import { calculateWinner } from "../utils";

export function useGame() {
  const [{ history, xIsNext, stepNumber }, dispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const current = useMemo(() => history[stepNumber], [history, stepNumber]);

  const winner = useMemo(() => calculateWinner(current), [current]);

  const status = useMemo(() => {
    return winner
      ? `Winner: ` + winner
      : `Next player: ` + (xIsNext ? "X" : "O");
  }, [winner, xIsNext]);

  const move = (i: number) => {
    dispatch({ type: "move", payload: i });
  };

  const jumpTo = (i: number) => {
    dispatch({ type: "jumpTo", payload: i });
  };

  return { history, winner, status, stepNumber, current, move, jumpTo };
}
