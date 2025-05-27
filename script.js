const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;

// Render board UI
function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, i) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.innerHTML = `<span>${cell}</span>`;
    cellElement.addEventListener('click', () => handleMove(i));
    boardElement.appendChild(cellElement);
  });
}

// Handle player move
function handleMove(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winning combination
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Restart game
function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameOver = false;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Initialize game
renderBoard();
