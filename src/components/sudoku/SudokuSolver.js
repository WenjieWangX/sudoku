import { setSudoku, setRunning, setCurrentPosition } from "../../actions";

export const SudokuSolver = (sudoku, dispatch, speed) => {
  let toDispatch = [];
  backTrackingAlgorithm(sudoku, toDispatch);
  if (speed === 0) {
    toDispatch = [];
    toDispatch.push(sudoku.map((ele) => ele.slice(0)));
  }
  toDispatch.push([-1, -1]);
  dispatch(setRunning(true));
  handleDispatch(dispatch, toDispatch, speed);
};

const backTrackingAlgorithm = (sudoku, toDispatch) => {
  let emptyPosition = findEmpty(sudoku);
  let row, col;
  if (emptyPosition) {
    [row, col] = emptyPosition;
    toDispatch.push([row, col]);
  } else {
    return true;
  }

  for (let i = 1; i < sudoku.length + 1; i++) {
    if (isValid(sudoku, i, row, col)) {
      sudoku[row][col] = i;
      toDispatch.push(sudoku.map((ele) => ele.slice(0)));
      if (backTrackingAlgorithm(sudoku, toDispatch)) {
        return true;
      }

      sudoku[row][col] = 0;
      toDispatch.push([row, col]);
      toDispatch.push(sudoku.map((ele) => ele.slice(0)));
    }
  }

  return false;
};

const isValid = (sudoku, num, row, col) => {
  //Check row
  for (let i = 0; i < sudoku[0].length; i++) {
    if (i !== col && sudoku[row][i] === num) {
      return false;
    }
  }

  //Check column
  for (let i = 0; i < sudoku.length; i++) {
    if (i !== row && sudoku[i][col] === num) {
      return false;
    }
  }

  //Check 3 * 3 box
  let boxXPos = Math.floor(col / 3) * 3;
  let boxYPos = Math.floor(row / 3) * 3;
  for (let i = boxYPos; i < boxYPos + 3; i++) {
    for (let j = boxXPos; j < boxXPos + 3; j++) {
      if (sudoku[i][j] === num && i !== row && j !== col) {
        return false;
      }
    }
  }

  return true;
};

const findEmpty = (sudoku) => {
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      if (sudoku[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return false;
};

const handleDispatch = (dispatch, toDispatch, speed) => {
  if (!toDispatch.length) {
    setTimeout(() => {
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction =
    toDispatch[0].length > 3 ? setSudoku : setCurrentPosition;

  // toDispatch[0].length === 2
  // ? setSwappers
  // : setFinishedIndex;

  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(dispatch, toDispatch);
  }, speed);
};
