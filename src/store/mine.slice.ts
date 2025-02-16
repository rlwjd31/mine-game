import { levelConfig } from "@/constants/level";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Level = "beginner" | "intermediate" | "expert" | "custom";
export type LevelConfig = {
  levelType: Level;
  row?: number;
  col?: number;
  numsOfMine?: number;
};

export type Mine = `${number},${number}`;

type MinefieldState = {
  levelConfig: LevelConfig;
  mines: Set<`${number},${number}`>;
};

const generateMines = ({
  levelType,
  row: rowParam,
  col: colParam,
  numsOfMine: numsOfMineParam,
}: LevelConfig): Set<`${number},${number}`> => {
  const [row, col, numsOfMine] = [
    rowParam ?? levelConfig[levelType].row,
    colParam ?? levelConfig[levelType].col,
    numsOfMineParam ?? levelConfig[levelType].numsOfMine,
  ];
  const mines = new Set<Mine>();

  while (mines.size < (numsOfMine ?? 0)) {
    const x = Math.floor(Math.random() * (row ?? 0));
    const y = Math.floor(Math.random() * (col ?? 0));
    mines.add(`${x},${y}`); // 중복 방지
  }

  return mines;
};

const initialState: MinefieldState = {
  levelConfig: { levelType: "beginner" },
  mines: generateMines({ levelType: "beginner" }),
};

const minefieldSlice = createSlice({
  name: "minefield",
  initialState,
  reducers: {
    setLevel(state, action: PayloadAction<LevelConfig>) {
      state.levelConfig = action.payload;
      state.mines = generateMines({ ...action.payload });
    },
    regenerateMines(state) {
      state.mines = generateMines(state.levelConfig);
    },
  },
});

export const { setLevel, regenerateMines } = minefieldSlice.actions;
export default minefieldSlice.reducer;
