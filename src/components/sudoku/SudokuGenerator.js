import React from "react";
import { setSudokuPuzzle, setSudoku, setFinalSudoku } from "../../actions";
import $ from "jquery";

export const SudokuGenerator = (dispatch) => {
  $("table").css("background-color", "");
  const base = 3,
    side = base * base,
    rBase = range(0, base),
    rows = [],
    cols = [],
    nums = shuffle(range(1, base * base + 1)),
    r = shuffle(rBase),
    c = shuffle(rBase),
    board = [],
    squares = side * side,
    empties = Math.floor((squares * 3) / 4);
  let g = shuffle(rBase);
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < r.length; j++) {
      rows.push(g[i] * base + r[j]);
    }
  }

  g = shuffle(rBase);

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < c.length; j++) {
      cols.push(g[i] * base + c[j]);
    }
  }

  for (let row of rows) {
    let currentRowCol = [];
    for (const col of cols) {
      currentRowCol = currentRowCol.concat([nums[pattern(row, col, base)]]);
    }

    board.push(currentRowCol.slice(0));
  }

  dispatch(setFinalSudoku(board.map((ele) => ele.slice(0))));

  for (const p of sample(range(0, squares), empties)) {
    board[Math.floor(p / side)][p % side] = 0;
  }
  dispatch(setSudokuPuzzle(board.map((ele) => ele.slice(0))));
  dispatch(setSudoku(board.map((ele) => ele.slice(0))));
};

const pattern = (row, col, base) =>
  (base * (row % base) + Math.floor(row / base) + col) % (base * base);

const shuffle = (s) => sample(s.slice(0), s.length);

const sample = (population, k) => {
  const newGenerateArray = [];

  for (let i = 0; i < k; i++) {
    if (population.length <= 0) {
      return newGenerateArray;
    }
    let randomNum = getRandomNum(population.length);
    newGenerateArray.push(population[randomNum]);
    population.splice(randomNum, 1);
  }

  return newGenerateArray;
};

const range = (startNum, num) => {
  const numArray = [];
  for (let i = startNum; i < num; i++) {
    numArray.push(i);
  }
  return numArray;
};

const getRandomNum = (len) => {
  return Math.floor(Math.random() * len);
};
