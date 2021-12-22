import { calculateWinner } from "./utils";

describe("calculateWinner", () => {
  const games = [
    ["XXOXXO OO", "O"],
    ["XXOOXXOXO", "X"],
  ];

  games.forEach(([squaresStr, winner]) => {
    const squares = squaresStr.split("");
    it(
      `The winner should be ${winner}` +
        "\n" +
        squaresStr.replace(/(.{3})/g, "$1\n"),
      () => {
        expect(calculateWinner(squares)).toBe(winner);
      }
    );
  });
});
