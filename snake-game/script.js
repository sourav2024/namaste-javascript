const board = document.querySelector(".board");

const blockHeight = 80;
const blockWidth = 80;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];

const snake = [
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 1,
    y: 5,
  },
];

let direction = "right";

// Create the blocks and store references in the blocks object
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${row}-${col}`; // Add text to show the position
    blocks[`${row}-${col}`] = block; // Use `${row}-${col}` to store the block
  }
}

function render() {
  // Clear previous "fill" class on all blocks (optional)
  Object.values(blocks).forEach(block => block.classList.remove("fill"));

  // Render the snake by adding the "fill" class to the correct blocks
  snake.forEach(segment => {
    const blockKey = `${segment.x}-${segment.y}`;
    const block = blocks[blockKey];
    if (block) {
      block.classList.add("fill");
    }
  });
}

// Update the render every 300ms
setInterval(() => {
  let head;

  // Calculate the new head position based on the direction
  switch (direction) {
    case "left":
      head = { x: snake[0].x, y: snake[0].y - 1 };
      break;
    case "right":
      head = { x: snake[0].x, y: snake[0].y + 1 };
      break;
    case "up":
      head = { x: snake[0].x - 1, y: snake[0].y };
      break;
    case "down":
      head = { x: snake[0].x + 1, y: snake[0].y };
      break;
    default:
      head = { x: snake[0].x, y: snake[0].y };
  }

  // Unshift the new head into the snake array
  snake.unshift(head);

  // Remove the tail if we are not growing the snake
  snake.pop();

  render();
}, 300);
