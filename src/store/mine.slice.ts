import { levelConfig } from "@/constants/mineInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Level = "beginner" | "intermediate" | "expert" | "custom";
export type LevelConfig = {
  levelType: Level;
  row: number;
  col: number;
  numsOfMine: number;
};
export type Board = {
  content: "flag" | "mine" | number;
  isOpen: boolean;
  position: MinePosition;
}[][];
export type MinePosition = `${number},${number}`;

type MinefieldState = {
  levelConfig: LevelConfig;
  mines: Set<`${number},${number}`>;
  board: Board;
};

const generateMines = ({
  row,
  col,
  numsOfMine,
}: LevelConfig): Set<`${number},${number}`> => {
  const mines = new Set<MinePosition>();

  while (mines.size < (numsOfMine ?? 0)) {
    const x = Math.floor(Math.random() * (row ?? 0));
    const y = Math.floor(Math.random() * (col ?? 0));
    mines.add(`${x},${y}`); // 중복 방지
  }

  return mines;
};

const generateBoard = ({
  row,
  col,
  mines,
}: {
  row: number;
  col: number;
  mines: Set<`${number},${number}`>;
}) => {
  const board: Board = [];

  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    const rowBoard = [];
    for (let colIndex = 0; colIndex < col; colIndex++) {
      const boardCellContent: Board[number][number] = {
        content: mines.has(`${rowIndex},${colIndex}`) ? "mine" : 0,
        position: `${rowIndex},${colIndex}`,
        isOpen: false,
      };

      rowBoard.push({ ...boardCellContent });
    }
    board.push([...rowBoard]);
  }

  return board;
};

const initialState: MinefieldState = (() => {
  const mines = generateMines({
    levelType: "beginner",
    ...levelConfig.beginner,
  });
  const board = generateBoard({ row: 8, col: 8, mines });
  return {
    levelConfig: { levelType: "beginner", ...levelConfig.beginner },
    mines: generateMines({ levelType: "beginner", ...levelConfig.beginner }),
    board,
  };
})();

console.log('initialState', initialState);

const minefieldSlice = createSlice({
  name: "minefield",
  initialState,
  reducers: {
    generateMineBoard(state, action: PayloadAction<LevelConfig>) {
      const { levelType, row, col, numsOfMine } = action.payload;
      const mines = generateMines({ ...action.payload });
      const board = generateBoard({ row, col, mines });

      state.levelConfig = { levelType, row, col, numsOfMine };
      state.mines = mines;
      state.board = board;
    },
  },
});

export const { generateMineBoard } = minefieldSlice.actions;
export default minefieldSlice.reducer;
