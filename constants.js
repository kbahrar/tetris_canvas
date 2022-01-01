const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const time = { start: 0, elapsed: 0, level: 1000 };

const KEY = {
    UP: 38,
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
}
Object.freeze(KEY);

const moves = {
    [KEY.UP]:       (p) => p,
    [KEY.SPACE]:    p => ({ ...p, y: p.y + 1 }),
    [KEY.LEFT]:     p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]:    p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]:     p => ({ ...p, y: p.y + 1 })
};

const COLORS = [  
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

const SHAPES = [  
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0]
    ], 
    [
      [0, 0, 0],
      [2, 2, 2],
      [0, 0, 2]
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ],
    [
      [4, 4, 0],
      [4, 4, 0],
      [0, 0, 0]
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ],
  ];


  const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
  }
  Object.freeze(POINTS);

  const LINES_PER_LEVEL = 10;

  const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 460,
    5: 370,
    6: 280,
    7: 200
  }

  Object.freeze(LEVEL);