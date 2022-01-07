export const sudokuArray = (state = [], action) => {
  if (action.type === "SET_SUDOKU") {
    return action.payload;
  }
  return state;
};
