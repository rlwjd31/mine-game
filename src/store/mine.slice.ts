import { directions, levelConfig } from "@/constants/mineInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Level = "beginner" | "intermediate" | "expert" | "custom";
export type LevelConfig = {
  levelType: Level;
  row: number;
  col: number;
  numsOfMine: number;
};
export type CellType = {
  content: "flag" | "mine" | number;
  isOpen: boolean;
  position: MinePosition;
};
export type Board = CellType[][];
export type MinePosition = `${number},${number}`;

type MinefieldState = {
  isEnd: {
    value: boolean;
    lastPosition: MinePosition;
  };
  isStart: boolean;
  levelConfig: LevelConfig;
  mines: Set<`${number},${number}`>;
  board: Board;
};

const generateMines = ({
  row,
  col,
  numsOfMine,
}: LevelConfig): Set<MinePosition> => {
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

const markMineCount = (board: Board, mines: Set<MinePosition>) => {
  const [ROW, COL] = [board.length, board[0].length];

  directions.forEach(([dx, dy]) => {
    Array.from(mines).forEach((mine) => {
      const [mineX, mineY] = mine.split(",").map(Number);
      const [nx, ny] = [mineX + dx, mineY + dy];

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COL) {
        if (typeof board[nx][ny].content === "number") {
          board[nx][ny].content += 1;
        }
      }
    });
  });
};

const initialState: MinefieldState = (() => {
  const mines = generateMines({
    levelType: "beginner",
    ...levelConfig.beginner,
  });
  const board = generateBoard({ row: 8, col: 8, mines });
  markMineCount(board, mines);

  return {
    isEnd: false,
    isStart: false,
    levelConfig: { levelType: "beginner", ...levelConfig.beginner },
    mines: generateMines({ levelType: "beginner", ...levelConfig.beginner }),
    board,
  };
})();

const minefieldSlice = createSlice({
  name: "minefield",
  initialState,
  reducers: {
    generateMineBoard(state, action: PayloadAction<LevelConfig>) {
      const { levelType, row, col, numsOfMine } = action.payload;
      const mines = generateMines({ ...action.payload });
      const board = generateBoard({ row, col, mines });
      markMineCount(board, mines);

      state.levelConfig = { levelType, row, col, numsOfMine };
      state.mines = mines;
      state.board = board;
    },
    setGameStart(state, action: PayloadAction<boolean>) {
      state.isStart = action.payload;
    },
    setGameEnd(
      state,
      action: PayloadAction<{ value: boolean; lastPosition: MinePosition }>
    ) {
      state.isEnd = action.payload;
    },
    cellOpen(state, action: PayloadAction<MinePosition>) {
      const [row, col] = action.payload.split(",").map(Number);
      const cell = state.board[row][col];

      if (cell.content === "mine") {
        state.isStart = false;
        state.isEnd = { value: true, lastPosition: action.payload };
        cell.isOpen = true;
        return;
      }

      cell.isOpen = true;
    },
  },
});

export const { generateMineBoard, setGameStart, setGameEnd, cellOpen } =
  minefieldSlice.actions;
export default minefieldSlice.reducer;
