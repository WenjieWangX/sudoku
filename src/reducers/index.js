import { combineReducers } from "redux";
import { sudokuArray } from "./sudokuArray";
import { position } from "./position";
import { sudokuPuzzle } from "./sudokuPuzzle";
import { finalSudoku } from "./finalSudoku";
import { isRunning } from "./running";
import { animationSpeed } from "./animationSpeed";

export default combineReducers({
  sudokuArray,
  position,
  sudokuPuzzle,
  finalSudoku,
  isRunning,
  animationSpeed,
});
