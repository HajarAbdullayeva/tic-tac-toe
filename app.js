const gameHeading = document.querySelector("#game-heading");
const gameSquare = document.querySelectorAll(".game-square");
const restartBtn = document.querySelector("#restart-button");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winningMessage = () => `Player ${currentPlayer === "X" ? 1 : 2} won!`;
const tieMessage = () => `Tie game`;
const currentPlayerTurn = () =>
  `Player ${currentPlayer === "X" ? 1 : 2}'s Turn`;

function handlegame(e) {
  const clickedCell = e.target;
  let clickedCellIndex = null;

  gameSquare.forEach((element, index) =>
    clickedCell === element ? (clickedCellIndex = index) : clickedCellIndex
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

gameSquare.forEach((square) => square.addEventListener("click", handlegame));
restartBtn.addEventListener("click", handleRestart);

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameHeading.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    console.log(winCondition);
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    console.log("a", a);
    console.log("b", b);
    console.log("c", c);
    console.log("!-----------------------------------!");

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      restartBtn.style.display = "block";
      break;
    }
  }

  if (roundWon) {
    gameHeading.innerHTML = winningMessage();
    gameActive = false;
    restartBtn.style.display = "block";
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameHeading.innerHTML = tieMessage();
    restartBtn.style.display = "block";

    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleRestart() {
  gameActive = true;
  currentPlayer = "X";
  gameHeading.innerHTML = currentPlayerTurn();
  restartBtn.style.display = "none";
  gameSquare.forEach((sq) => (sq.innerHTML = ""));
}
