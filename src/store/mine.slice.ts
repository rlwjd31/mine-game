import { levelConfig } from "@/constants/level";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Level = "beginner" | "intermediate" | "expert";

export type Mine = `${number},${number}`;

type MinefieldState = {
  level: Level;
  mines: Set<`${number},${number}`>
};

const generateMines = (levelType: Level): Set<`${number},${number}`> => {
  const { row, col, numsOfMine } = levelConfig[levelType];
  const mines = new Set<Mine>();

  while (mines.size < numsOfMine) {
    const x = Math.floor(Math.random() * row);
    const y = Math.floor(Math.random() * col);
    mines.add(`${x},${y}`); // 중복 방지
  }

  return mines;
};

const initialState: MinefieldState = {
  level: "beginner",
  mines: generateMines("beginner"),
};

const minefieldSlice = createSlice({
  name: "minefield",
  initialState,
  reducers: {
    setLevel(state, action: PayloadAction<Level>) {
      state.level = action.payload;
      state.mines = generateMines(action.payload);
    },
    regenerateMines(state) {
      state.mines = generateMines(state.level);
    },
  },
});

export const { setLevel, regenerateMines } = minefieldSlice.actions;
export default minefieldSlice.reducer;
