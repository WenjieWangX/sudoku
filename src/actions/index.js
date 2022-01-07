export const setSudoku = (array) => {
  return {
    type: "SET_SUDOKU",
    payload: array,
  };
};

export const setRunning = (boolean) => {
  return {
    type: "SET_RUNNING",
    payload: boolean,
  };
};

export const setCurrentPosition = (array) => {
  return {
    type: "SET_CURRENT_POSITION",
    payload: array,
  };
};

export const setSudokuPuzzle = (array) => {
  return {
    type: "SET_SUDOKU_PUZZLE",
    payload: array,
  };
};

export const setFinalSudoku = (array) => {
  return {
    type: "SET_FINAL_SUDOKU",
    payload: array,
  };
};

export const setAnimationSpeed = (speed) => {
  return {
    type: "SET_ANIMATION_SPEED",
    payload: speed,
  };
};
