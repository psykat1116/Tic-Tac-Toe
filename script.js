let resetBtn = document.getElementById("reset");
let statusText = document.getElementById("msg");
let cells = document.querySelectorAll(".container #game .cell");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

init();

function init() {
  cells.forEach((e) => {
    e.addEventListener("click", cellClick);
  });
  resetBtn.onclick = () => {
    resetGame();
  };
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClick() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function togglePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    let condition = winCondition[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw`;
    running = false;
  } else {
    togglePlayer();
  }
}

function resetGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((e) => {
    e.textContent = "";
  });
  running = true;
}
