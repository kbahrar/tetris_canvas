const canvas = document.getElementById('board');
const board = new Board();
const ctx = canvas.getContext('2d');
var pause = false;
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
// Size canvas for four blocks.
ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

let accountValues = {
    score: 0,
    lines: 0,
    level: 0
}
  
function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
      target[key] = value;
      updateAccount(key, value);
      return true;
    }
})

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {  
        // Stop the event from bubbling.
        event.preventDefault();
        
        // Get new state of piece
        let p = moves[event.keyCode](board.piece);
        
        if (event.keyCode === KEY.SPACE) {
            // Hard drop
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                board.piece.move(p);   
                p = moves[KEY.DOWN](board.piece);
            }
        }
        else if (event.keyCode === KEY.UP) {
            // console.log('o')
           board.piece.rotate(p)
           ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
           board.piece.draw();
        }
        else if (board.valid(p)) {    
            if (event.keyCode === KEY.DOWN) {
                account.score += POINTS.SOFT_DROP;
            }
            // If the move is valid, move the piece.
            board.piece.move(p);
            
            // Clear old position before drawing.
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
            
            board.piece.draw();
        }
    }
});
// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function drop() {
    let p = moves[KEY.DOWN](board.piece);
    if (board.valid(p)) {
        board.piece.move(p);  
        p = moves[KEY.DOWN](board.piece);
        // console.log(p)
    }
    else {
        board.freeze()
        console.table(board.grid);
        board.clearLines()
        let piece = new Piece(ctxNext);
        ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height); 
        piece.drawNext()
        board.next.ctx = ctx;
        board.piece = board.next;
        board.next = piece;
    }
}

function animate(now = 0) {
    // Update elapsed time.  
    time.elapsed = now - time.start;
    // var flag = true
    
    // If elapsed time has passed time for current level  
    if (time.elapsed > time.level) {
    
      // Restart counting from now
      time.start = now;   
      
      this.drop();  
    }

    
    // Clear board before drawing new state.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    
    board.draw();
    if (!pause)
        requestId = requestAnimationFrame(animate);

    for (let i = 0; i < board.grid[0].length; i++) {
        if (board.grid[0][i] > 0) {
            // flag = false
            window.cancelAnimationFrame(requestId);
            gameOver()
            return ;
        }
    }
}

function play() {
    if (pause) {
        pause = false
        animate()
    }
    else {
        account.score = account.level = account.lines = 0;
        board.reset();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let piece = new Piece(ctx);
        // piece.draw();
        
        board.piece = piece;
        board.next = new Piece(ctxNext)
        board.next.drawNext()
        board.ctx = ctx;
        board.ctxNext = ctxNext;
        animate()
    }
}

function getPause () {
    pause = true
}

function gameOver() {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);
}