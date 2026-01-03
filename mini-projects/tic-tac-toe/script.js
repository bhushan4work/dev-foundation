const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// INITIALIZE
getInitialize();
function getInitialize() {
  running = true;
  cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
}

// CLICK HANDLER
function cellClicked(e) {
  const cell = e.target;
  const index = Number(cell.dataset.index);

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

// CHECK WINNER after each turn and change the player if no winner found
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]; //we hold one of the 8 winning patterns here as [a,b,c]
    //in cellA we get 1st index from condition[0] and then board[] gives "X" or "O" or ""
    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") { //if all cells empty then continue
      continue;
    }
    if (cellA == cellB && cellB == cellC) { //if all cells are same give winner n break the loop
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  else if (!board.includes("")) { //after all cells occupied , if no winner found then draw
    statusText.textContent = `Draw!`;
    running = false;
  }
  else {
    changePlayer(); 
  }
}

// RESTART
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = ""); //set cells to empty  
}
