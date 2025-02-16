export const levelConfig = {
  beginner: { row: 8, col: 8, numsOfMine: 10 },
  intermediate: { row: 16, col: 16, numsOfMine: 40 },
  expert: { row: 16, col: 32, numsOfMine: 100 },
  custom: { row: null, col: null, numsOfMine: null },
};

export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const fourDirections = [[-1, 0], [0, -1], [0, 1], [1, 0]];