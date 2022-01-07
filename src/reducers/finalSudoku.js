export const finalSudoku = (state = [], action) => {
  if (action.type === "SET_FINAL_SUDOKU") {
    return action.payload;
  }

  return state;
};
