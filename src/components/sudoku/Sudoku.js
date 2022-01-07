import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CreateTable } from "./CreateTable";
import { SudokuGenerator } from "./SudokuGenerator";
import { SudokuSolver } from "./SudokuSolver";
import { AnimationSpeedOptions } from "./AnimationSpeedOptions";
import "./table.css";
import "./sudoku.css";

export const Sudoku = () => {
  const sudokuArray = useSelector((state) => state.sudokuArray);
  const sudokuPuzzle = useSelector((state) => state.sudokuPuzzle);
  console.log(sudokuPuzzle);
  const finalSudoku = useSelector((state) => state.finalSudoku);
  const isRunning = useSelector((state) => state.isRunning);
  const selectedSpeed = useSelector((state) => state.animationSpeed);
  const speed =
    selectedSpeed === "Slow"
      ? 200
      : selectedSpeed === "Normal"
      ? 100
      : selectedSpeed === "Fast"
      ? 1
      : 0;
  let pos = useSelector((state) => state.position);
  const dispatch = useDispatch();

  useEffect(() => {
    SudokuGenerator(dispatch);
  }, []);

  useEffect(() => {
    CreateTable(
      sudokuArray,
      pos,
      finalSudoku,
      dispatch,
      isRunning,
      sudokuPuzzle
    );
  }, [sudokuArray, pos]);

  return (
    <div>
      <h1>Sudoku</h1>
      <table></table>
      <button
        className="btn btn--white btn--animated"
        disabled={isRunning}
        onClick={() => {
          SudokuSolver(sudokuPuzzle, dispatch, speed);
        }}
      >
        Solve
      </button>
      <button
        className="btn btn--white btn--animated"
        disabled={isRunning}
        onClick={() => {
          SudokuGenerator(dispatch);
        }}
      >
        Generate New Puzzle
      </button>
      <AnimationSpeedOptions disabled={isRunning} />
    </div>
  );
};
