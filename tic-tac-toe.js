console.log("loaded tic tac toe!");

// create reference to game-board div in the DOM.
const gameBoard = document.getElementById("game-board");
const endGame = document.getElementById("end-game");
const winningMessage = document.getElementById("winning-message");

function createPlayer(name) {
  let score = 0;
  let marker = null;
  const getScore = () => score;
  const incrementScore = () => score++;
  const setMarker = (newMarker) => (marker = newMarker);
  const getMarker = () => marker;
  return { name, getScore, incrementScore, setMarker, getMarker };
}

function createGame() {
  // create players, and set starting player to null;
  let player1 = null;
  let player2 = null;
  let playersTurn = null;
  let winner = null;
  let moveCount = 0;

  // getters
  const getBoard = () => board;
  const getPlayers = () => [player1, player2];

  // create board structure as a 2D array
  const board = [];
  for (let i = 0; i < 3; i++) {
    board.push(new Array(3).fill(null));
  }
  const resetGame = () => {
    // Reset players, board, and move count
    for (let i = 0; i < 3; i++) {
      board[i].fill(null);
    }
    playersTurn = player1;
    moveCount = 0;
    endGame.classList.add("hidden");
    gameBoard.classList.remove("hidden");
    drawBoard();
  };

  /*  add player function creates a player, 
        ensuring that only two players can exist. 
        assigns each player a different marker.
        Initializes the starting player 
    */
  const addPlayer = (player) => {
    if (!player1) {
      player1 = player;
      player1.setMarker("X");
      playersTurn = player1;
      return player1;
    }
    if (!player2) {
      player2 = player;
      player2.setMarker("O");
      return player2;
    } else {
      alert("Cannot add another player!, this is a two player game!");
    }
  };

  const incrementMoveCount = () => moveCount++;

  /* 
        play piece check if move is legal for a given player 
        for a given place on the board. 
    */
  const isGameOver = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        winningMessage.textContent = `${
          board[i][0] === "X" ? player1.name : player2.name
        } wins!`;
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        winningMessage.textContent = `${
          board[0][i] === "X" ? player1.name : player2.name
        } wins!`;
        return true;
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      winningMessage.textContent = `${
        board[0][0] === "X" ? player1.name : player2.name
      } wins!`;
      return true;
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      winningMessage.textContent = `${
        board[0][2] === "X" ? player1.name : player2.name
      } wins!`;
      return true;
    }

    // Check for a draw
    if (moveCount === 9) {
      winningMessage.textContent = "It's a draw!";
      return true;
    }

    // If no win condition is met, return false
    return false;
  };

  const playPiece = (player, positionX, positionY) => {
    if (player === playersTurn) {
      if (positionX > 2 || positionX < 0 || positionY > 2 || positionY < 0) {
        alert("illegal move, placement out of bounds, choose a valid location");
        return false;
      }
      if (!board[positionX][positionY]) {
        board[positionX][positionY] = player.getMarker();
        if (player === player1) {
          playersTurn = player2;
        } else {
          playersTurn = player1;
        }
        incrementMoveCount();
        return true;
      } else {
        alert("place already taken, please choose another!");
        return false;
      }
    } else {
      alert("wrong players turn!");
      return false;
    }
  };

  /* 
        Draws thw board in the DOM,
        includes the event listener on each tile
        to detect latest move.
        drawBoard() is called after every move.
    */
  const drawBoard = () => {
    gameBoard.innerHTML = "";
    gameBoard.classList.add("board");

    for (let i = 0; i < 3; i++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("row");

      for (let j = 0; j < 3; j++) {
        const boardTile = document.createElement("div");
        boardTile.setAttribute("id", `tile-${i}-${j}`);
        boardTile.classList.add("tile");

        const tileText = document.createElement("p");
        if (board[i][j]) {
          tileText.innerText = board[i][j];
        }
        boardTile.appendChild(tileText);
        boardRow.appendChild(boardTile);

        boardTile.addEventListener("click", () => {
          if (playPiece(playersTurn, i, j)) {
            drawBoard();
            if (isGameOver()) {
              endGame.classList.remove("hidden");
              document
                .querySelectorAll(".tile")
                .forEach((tile) => tile.classList.add("game-over"));
            }
          }
        });
      }
      gameBoard.appendChild(boardRow);
    }
  };

  return { addPlayer, drawBoard, resetGame };
}

// DOM setup for starting the game
const playerForm = document.getElementById("player-form");
const startGame = document.getElementById("start-game");
const formContainer = document.getElementById("form-container");
const playAgainBtn = document.getElementById("play-again");

startGame.addEventListener("click", (e) => {
  e.preventDefault();

  const player1Name = playerForm["player1"].value;
  const player2Name = playerForm["player2"].value;

  const player1 = createPlayer(player1Name);
  const player2 = createPlayer(player2Name);

  // Create game instance and add players
  const game = createGame();
  game.addPlayer(player1);
  game.addPlayer(player2);

  // Show game board & hide form
  gameBoard.classList.remove("hidden");
  formContainer.classList.add("hidden");

  game.drawBoard();

  playAgainBtn.addEventListener("click", () => {
    game.resetGame();
    endGame.classList.add("hidden");
  });
});
