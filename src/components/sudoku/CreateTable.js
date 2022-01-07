import React from "react";
import { setSudoku, setCurrentPosition, setSudokuPuzzle } from "../../actions";
import $ from "jquery";

export const CreateTable = (
  array,
  pos,
  finalSudoku,
  dispatch,
  isSolving,
  sudokuPuzzle
) => {
  let isRightPosition = false;
  if (pos[0] === -1 && pos[1] === -1) {
    $("table").css("background-color", "rgb(185, 232, 185)");
    dispatch(setCurrentPosition([-2, -2]));
  }

  if (!isSolving) {
    for (let i = 1; i < array.length + 1; i++) {
      for (let j = 1; j < array[i - 1].length + 1; j++) {
        if (pos) {
          if (i === pos[0] + 1 && j === pos[1] + 1) {
            isRightPosition = true;
          } else {
            isRightPosition = false;
          }
        }

        if (array[i - 1][j - 1] !== 0) {
          if (isCorrect(array, finalSudoku, i - 1, j - 1)) {
            if (!isRightPosition) {
              if (i === 1 && j === 1) {
                $("table").html(`<tr id="${i}"></tr>`);
                $(`#${i}`).append(
                  `<td class="correct-pos">${array[i - 1][j - 1]}</td>`
                );
              } else {
                if (j === 1) {
                  $("table").append(`<tr id="${i}"></tr>`);
                }
                if (i % 3 === 0 && j % 3 === 0) {
                  if (i !== array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border column-box-border correct-pos">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else if (i === array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="column-box-border correct-pos">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else if (i !== array.length && j === array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border correct-pos">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else {
                    $(`#${i}`).append(
                      `<td class="correct-pos">${array[i - 1][j - 1]}</td>`
                    );
                  }
                } else if (i % 3 === 0 && j % 3 !== 0) {
                  if (i === 9) {
                    $(`#${i}`).append(
                      `<td class="correct-pos">${array[i - 1][j - 1]}</td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="row-box-border correct-pos">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i % 3 !== 0 && j % 3 === 0) {
                  if (j === 9) {
                    $(`#${i}`).append(
                      `<td class="correct-pos">${array[i - 1][j - 1]}</td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="column-box-border correct-pos">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class="correct-pos">${array[i - 1][j - 1]}</td>`
                  );
                }
              }
            } else {
              if (i === 1 && j === 1) {
                $("table").html(`<tr id="${i}"></tr>`);
                $(`#${i}`).append(
                  `<td class="correct-pos current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else {
                if (j === 1) {
                  $("table").append(`<tr id="${i}"></tr>`);
                }
                if (i % 3 === 0 && j % 3 === 0) {
                  if (i !== array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border column-box-border correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else if (i === array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="column-box-border correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else if (i !== array.length && j === array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  } else {
                    $(`#${i}`).append(
                      `<td class = "correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                  }
                } else if (i % 3 === 0 && j % 3 !== 0) {
                  if (i === 9) {
                    $(`#${i}`).append(
                      `<td class="correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="row-box-border correct-pos current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i % 3 !== 0 && j % 3 === 0) {
                  if (j === 9) {
                    $(`#${i}`).append(
                      `<td class="correct-pos current-position">${
                        array[i - 1][j - 1]
                      }</td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="column-box-border correct-pos current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class="correct-pos current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                }
              }
            }
          } else {
            if (!isRightPosition) {
              if (i === 1 && j === 1) {
                $("table").html(`<tr id="${i}"></tr>`);
                $(`#${i}`).append(
                  `<td class="wrong-pos" value=${
                    array[i - 1][j - 1]
                  }><input class="wrong-pos" value=${array[i - 1][j - 1]} id=${
                    i - 1
                  }${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              } else {
                if (j === 1) {
                  $("table").append(`<tr id="${i}"></tr>`);
                }
                if (i % 3 === 0 && j % 3 === 0) {
                  if (i !== array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border column-box-border wrong-pos"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else if (i === array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="column-box-border wrong-pos"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else if (i !== array.length && j === array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border wrong-pos"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else {
                    $(`#${i}`).append(
                      `<td class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      }><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  }
                } else if (i % 3 === 0 && j % 3 !== 0) {
                  if (i === 9) {
                    $(`#${i}`).append(
                      `<td class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      }><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="row-box-border wrong-pos"><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else if (i % 3 !== 0 && j % 3 === 0) {
                  if (j === 9) {
                    $(`#${i}`).append(
                      `<td class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      }><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="column-box-border wrong-pos"><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    }><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                }
              }
            } else {
              if (i === 1 && j === 1) {
                $("table").html(`<tr id="${i}"></tr>`);
                $(`#${i}`).append(
                  `<td class="wrong-pos current-position"><input class="wrong-pos" value=${
                    array[i - 1][j - 1]
                  } id=${i - 1}${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              } else {
                if (j === 1) {
                  $("table").append(`<tr id="${i}"></tr>`);
                }
                if (i % 3 === 0 && j % 3 === 0) {
                  if (i !== array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border column-box-border wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else if (i === array.length && j !== array.length) {
                    $(`#${i}`).append(
                      `<td class="column-box-border wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else if (i !== array.length && j === array.length) {
                    $(`#${i}`).append(
                      `<td class="row-box-border wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  } else {
                    $(`#${i}`).append(
                      `<td class = "wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                  }
                } else if (i % 3 === 0 && j % 3 !== 0) {
                  if (i === 9) {
                    $(`#${i}`).append(
                      `<td class="wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="row-box-border wrong-pos current-position"><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else if (i % 3 !== 0 && j % 3 === 0) {
                  if (j === 9) {
                    $(`#${i}`).append(
                      `<td class="wrong-pos current-position"><input class="wrong-pos" value=${
                        array[i - 1][j - 1]
                      } id=${i - 1}${
                        j - 1
                      } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                    );
                    continue;
                  }
                  $(`#${i}`).append(
                    `<td class="column-box-border wrong-pos current-position"><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class="wrong-pos current-position"><input class="wrong-pos" value=${
                      array[i - 1][j - 1]
                    } id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                }
              }
            }
          }
        } else {
          if (!isRightPosition) {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(
                `<td><input id=${i - 1}${
                  j - 1
                } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
              );
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border"><input id=${
                      i - 1
                    }${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border"><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border"><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(
                    `<td><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border"><input id=${i - 1}${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(
                    `<td><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border"><input id=${i - 1}${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              } else {
                $(`#${i}`).append(
                  `<td><input id=${i - 1}${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              }
            }
          } else {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(
                `<td class="current-position"><input id=${i - 1}${
                  j - 1
                } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
              );
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class = "current-position"><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position"><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position"><input id=${i - 1}${
                      j - 1
                    } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else {
                $(`#${i}`).append(
                  `<td class="current-position"><input id=${i - 1}${
                    j - 1
                  } oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1"></td>`
                );
              }
            }
          }
        }
      }
    }
    $("input").on("change", function (event) {
      const currentID = $(this).attr("id");
      const newArray = array;
      newArray[parseInt(currentID[0])][parseInt(currentID[1])] = parseInt(
        event.target.value
      );
      if (
        isCorrect(
          newArray,
          finalSudoku,
          parseInt(currentID[0]),
          parseInt(currentID[1])
        )
      ) {
        sudokuPuzzle[parseInt(currentID[0])][parseInt(currentID[1])] = parseInt(
          event.target.value
        );
        dispatch(setSudokuPuzzle(sudokuPuzzle.slice(0)));
      }
      dispatch(setSudoku(newArray.slice(0)));
    });
  } else {
    for (let i = 1; i < array.length + 1; i++) {
      for (let j = 1; j < array[i - 1].length + 1; j++) {
        if (pos) {
          if (i === pos[0] + 1 && j === pos[1] + 1) {
            isRightPosition = true;
          } else {
            isRightPosition = false;
          }
        }

        if (array[i - 1][j - 1] !== 0) {
          if (!isRightPosition) {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(`<td>${array[i - 1][j - 1]}</td>`);
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border">${array[i - 1][j - 1]}</td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border">${array[i - 1][j - 1]}</td>`
                  );
                } else {
                  $(`#${i}`).append(`<td>${array[i - 1][j - 1]}</td>`);
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(`<td>${array[i - 1][j - 1]}</td>`);
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border">${array[i - 1][j - 1]}</td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(`<td>${array[i - 1][j - 1]}</td>`);
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border">${array[i - 1][j - 1]}</td>`
                );
              } else {
                $(`#${i}`).append(`<td>${array[i - 1][j - 1]}</td>`);
              }
            }
          } else {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(
                `<td class="current-position">${array[i - 1][j - 1]}</td>`
              );
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class = "current-position">${array[i - 1][j - 1]}</td>`
                  );
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position">${array[i - 1][j - 1]}</td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position">${array[i - 1][j - 1]}</td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else {
                $(`#${i}`).append(
                  `<td class="current-position">${array[i - 1][j - 1]}</td>`
                );
              }
            }
          }
        } else {
          if (!isRightPosition) {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(
                `<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
              );
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(
                    `<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(
                    `<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                );
              } else {
                $(`#${i}`).append(
                  `<td><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                );
              }
            }
          } else {
            if (i === 1 && j === 1) {
              $("table").html(`<tr id="${i}"></tr>`);
              $(`#${i}`).append(
                `<td class="current-position"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
              );
            } else {
              if (j === 1) {
                $("table").append(`<tr id="${i}"></tr>`);
              }
              if (i % 3 === 0 && j % 3 === 0) {
                if (i !== array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i === array.length && j !== array.length) {
                  $(`#${i}`).append(
                    `<td class="column-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else if (i !== array.length && j === array.length) {
                  $(`#${i}`).append(
                    `<td class="row-box-border current-position">${
                      array[i - 1][j - 1]
                    }</td>`
                  );
                } else {
                  $(`#${i}`).append(
                    `<td class = "current-position"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                }
              } else if (i % 3 === 0 && j % 3 !== 0) {
                if (i === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="row-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else if (i % 3 !== 0 && j % 3 === 0) {
                if (j === 9) {
                  $(`#${i}`).append(
                    `<td class="current-position"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                  );
                  continue;
                }
                $(`#${i}`).append(
                  `<td class="column-box-border current-position">${
                    array[i - 1][j - 1]
                  }</td>`
                );
              } else {
                $(`#${i}`).append(
                  `<td class="current-position"><input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength="1" onChange=></td>`
                );
              }
            }
          }
        }
      }
    }
  }
};

const isCorrect = (array, finalArray, i, j) => {
  if (array[i][j] === finalArray[i][j]) {
    return true;
  }
  return false;
};
