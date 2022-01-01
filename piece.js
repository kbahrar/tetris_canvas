class Piece {  
    constructor(ctx) {
      this.ctx = ctx;
      
      // get shape and color
      const typeId = this.randomizeTetrominoType(COLORS.length);
      this.shape = SHAPES[typeId];
      this.color = COLORS[typeId];
      
      // Starting position.
      this.x = 3;
      this.y = 0;
    }

    randomizeTetrominoType(noOfTypes) {
      return Math.floor(Math.random() * noOfTypes);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            // console.log(x, y)
            if (value > 0) {
              this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
            }
          });
        });
    }

    drawNext() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            // console.log(x, y)
            if (value > 0) {
              this.ctx.fillRect(x, y, 1, 1);
            }
          });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }

    rotate(p){        
        // algorithm
        // Transpose matrix, p is the Piece.
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = 
            [p.shape[y][x], p.shape[x][y]];
            }
        }
  
        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());

        return p;
    }
}