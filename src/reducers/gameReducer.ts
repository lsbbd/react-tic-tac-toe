import { calculateWinner } from "../utils";

export interface GameState {
  history: string[][];
  stepNumber: number;
  xIsNext: boolean;
}

export const initialGameState: GameState = {
  history: [Array(9).fill(null)],
  stepNumber: 0,
  xIsNext: true,
};

export function gameReducer(
  state: GameState,
  action: { type: string; payload: any }
): GameState {
  switch (action.type) {
    case "jumpTo": {
      const i: number = action.payload;
      return {
        ...state,
        stepNumber: i,
        xIsNext: i % 2 === 0,
      };
    }

    case "move": {
      const i: number = action.payload;
      const { history, stepNumber, xIsNext } = state;
      const historyUntilStep = history.slice(0, stepNumber + 1);
      const squares = historyUntilStep[historyUntilStep.length - 1].slice();
      const winner = calculateWinner(squares);
      const hasFilled = !!squares[i];
      if (winner || hasFilled) return state;

      squares[i] = xIsNext ? "X" : "O";
      return {
        ...state,
        history: historyUntilStep.concat([squares]),
        xIsNext: !xIsNext,
        stepNumber: historyUntilStep.length,
      };
    }

    default:
      throw new Error();
  }
}
