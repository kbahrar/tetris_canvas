class Board { 
  // Reset the board when we start a new game.
  reset() {
    this.grid = this.getEmptyBoard();
  }
  
  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }

  isEmpty (value) {
    // console.log(value)
    if (value)
      return false
    else
      return true
  }

  insideWalls (x) {
    if (x == 10 || x == -1)
      return false
    return true
  }

  aboveFloor (y) {
    // console.log(y)
    if (y == 20)
      return false
    return true
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        // console.log(dx, dy)
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
         (this.insideWalls(x) &&
          this.aboveFloor(y) && this.grid[y][x] === 0
        ));
      });
    });
  }

  clearLines() {
    let lines = 0;
    this.grid.forEach((row, y) => {

      // If every value is greater than 0.
      if (row.every(value => value > 0)) {
        lines++;
        // Remove the row.
        this.grid.splice(y, 1);
        
        // Add zero filled row at the top. 
        this.grid.unshift(Array(COLS).fill(0));
      } 
    });
    if (lines > 0) {
      account.score += (account.level + 1) * this.getLineClearPoints(lines);
      account.lines += lines;
      if (account.lines > (account.level + 1) * 10) {
        account.level++;
        time.level = LEVEL[account.level]
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }
  
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.piece.draw();
    // this.freeze()
    this.drawBoard();
  }  

  getLineClearPoints(lines) {  
    return lines === 1 ? POINTS.SINGLE :
           lines === 2 ? POINTS.DOUBLE :  
           lines === 3 ? POINTS.TRIPLE :     
           lines === 4 ? POINTS.TETRIS : 
           0;
  }
}