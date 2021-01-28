function isValid(sudoku, i, j, val) {
  for (let j2 = 0; j2 < 9; j2++) {
    if (sudoku[i][j2] === val)
      return false;
  }
  for (let i2 = 0; i2 < 9; i2++) {
    if (sudoku[i2][j] === val)
      return false;
  }
  const x = Math.floor(i / 3) * 3;
  const y = Math.floor(j / 3) * 3;

  for (let x_offset = 0; x_offset < 3; x_offset++) {
    for (let y_offset = 0; y_offset < 3; y_offset++) {
      if (sudoku[x + x_offset][y + y_offset] === val)
        return false;
    }
  }
  return true;
}

function solve_sudoku(sudoku) {
  const solutions = [];
  const solve = sudoku => {
    let isSolved = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          isSolved = false;
          for (let val = 1; val <= 9; val++) {
            if (isValid(sudoku, i, j, val)) {
              sudoku[i][j] = val;
              solve(sudoku);
              sudoku[i][j] = 0;
            }
          }
          return;
        }
      }
    }
    if (isSolved) {
      const copy = sudoku.map(x => [...x]);
      solutions.push(copy);
    }
  };
  solve(sudoku);
  console.log(solutions);
  return solutions;
}
export default solve_sudoku;