import './App.css';
import Sudoku from './Sudoku';
import solve_sudoku from './solve';
import { useState } from 'react';

function App() {
  const [sudoku, setSudoku] = useState([
    [0, 0, 4, 3, 0, 0, 0, 0, 1],
    [0, 0, 7, 0, 9, 1, 2, 4, 0],
    [1, 9, 0, 0, 4, 0, 8, 0, 0],
    [7, 0, 9, 2, 0, 0, 5, 0, 6],
    [0, 0, 2, 0, 5, 0, 0, 3, 0],
    [0, 0, 0, 0, 7, 6, 9, 1, 2],
    [4, 0, 5, 0, 8, 0, 0, 0, 0],
    [2, 7, 0, 0, 0, 0, 1, 5, 8],
    [0, 0, 0, 6, 2, 5, 3, 7, 0]
  ])

  const setCell = (x, y, value) => {
    sudoku[x][y] = value;
    setSudoku(sudoku);
  }

  const handleSolve = () => {
    const solutions = solve_sudoku(sudoku);
    if (solutions.length==0) {
      console.log('No solutions');
      return;
    }
    if (solutions.length>1) {
      console.log('Many solutions');
    }
    setSudoku(solve_sudoku(sudoku)[0])
  };

  const handleClear = () => {
    const cleared = sudoku.map(x=>x.map(y=>0));
    setSudoku(cleared);
  };

  return (
    <div className="App">
      <h1>Sudoku solver</h1>
      <Sudoku sudoku={sudoku} setCell={setCell} />
      <button onClick={() => handleSolve()}>solve</button>
      <button onClick={() => handleClear()}>clear</button>
    </div>
  );
}

export default App;
