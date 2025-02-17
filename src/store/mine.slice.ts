import { directions, fourDirections, levelConfig } from "@/constants/mineInfo";
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
  isFirstClick: boolean;
  isEnd: {
    value: boolean;
    lastPosition: MinePosition | null;
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

const openCellBFS = (startX: number, startY: number, board: Board) => {
  const queue: [number, number][] = [[startX, startY]];
  const visited = new Set<MinePosition>();

  while (queue.length > 0) {
    const [x, y] = queue.shift() as [number, number];
    const currentPosition = `${x},${y}` as MinePosition;
    const canGo =
      !visited.has(currentPosition) &&
      x >= 0 &&
      y >= 0 &&
      x < board.length &&
      y < board[0].length &&
      board[x][y].content !== "mine";

    console.log("canGo", canGo);

    if (!canGo) {
      continue;
    }

    if (board[x][y].content !== 0) {
      board[x][y].isOpen = true;
      continue;
    }

    visited.add(currentPosition);
    board[x][y].isOpen = true;

    for (const [dx, dy] of fourDirections) {
      queue.push([x + dx, y + dy]);
    }
  }
};

const initialState: MinefieldState = (() => {
  const mines = generateMines({
    levelType: "beginner",
    ...levelConfig.beginner,
  });
  const board = generateBoard({ row: 8, col: 8, mines });
  markMineCount(board, mines);

  return {
    isFirstClick: true,
    isEnd: { value: false, lastPosition: null },
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

      if (state.isFirstClick && cell.content === "mine") {
        const { row, col } = state.levelConfig;
        let mines = generateMines({
          ...state.levelConfig,
        });

        while (!mines.has(action.payload)) {
          mines = generateMines({
            ...state.levelConfig,
          });
        }
        
        state.isFirstClick = false;
        const board = generateBoard({ row, col, mines });
        markMineCount(board, mines);

        return;
      }

      state.isFirstClick = true;

      if (cell.content === "mine") {
        state.isStart = false;
        state.isEnd = { value: true, lastPosition: action.payload };
        state.board.forEach((row) =>
          row.forEach((cell) => (cell.isOpen = true))
        );
        return;
      }

      openCellBFS(row, col, state.board);
    },
  },
});

export const { generateMineBoard, setGameStart, setGameEnd, cellOpen } =
  minefieldSlice.actions;
export default minefieldSlice.reducer;
