export const sudokuPuzzle = (state = [], action) => {
  if (action.type === "SET_SUDOKU_PUZZLE") {
    return action.payload;
  }
  return state;
};
