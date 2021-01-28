import Sketch from "react-p5";

function Sudoku({ sudoku, setCell }) {
  const [width, height] = [500, 500];
  let selectedCell = null;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(255);

    if (selectedCell !== null) {
      p5.fill(150, 150, 255)

      const x = selectedCell[0] * width / 9
      const y = selectedCell[1] * height / 9

      p5.rect(y, x, width / 9, height / 9);
    }

    // Draw lines
    p5.fill(0)
    for (let i = 0; i <= 9; i++) {
      const x = (width - 3) / 9 * i + 1.5;
      if (i % 3 === 0) {
        p5.strokeWeight(3);
      } else {
        p5.strokeWeight(1);
      }

      p5.line(0, x, width, x)
      p5.line(x, 0, x, height)
    }

    p5.textSize(32)
    p5.strokeWeight(1);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = sudoku[j][i];
        if (val !== 0) {
          p5.text(val, (i + 0.4) * width / 9, (j + 0.7) * height / 9);
        }
      }
    }

  };

  const mouseClicked = p5 => {
    const x = Math.floor(p5.mouseX / width * 9)
    const y = Math.floor(p5.mouseY / height * 9)

    selectedCell = [y, x];
  }

  const keyTyped = p5 => {
    if (selectedCell === null) {
      return;
    }
    if (p5.keyCode >= 48 && p5.keyCode <= 57) {
      setCell(...selectedCell, p5.keyCode - 48);
    } else if (p5.keyCode >= 96 && p5.keyCode <= 105) {
      setCell(...selectedCell, p5.keyCode - 96);
    }
  }

  return <
    Sketch
    setup={setup}
    draw={draw}
    mouseClicked={mouseClicked}
    keyTyped={keyTyped}
  />;
}

export default Sudoku;