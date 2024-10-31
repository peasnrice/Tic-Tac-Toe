console.log("loaded tic tac toe!");

function createPlayer(name) {
    let score = 0;
    let marker = null;
    const getScore = () => score;
    const incrementScore = () => score++;
    const setMarker = (newMarker) => marker = newMarker;
    const getMarker = () => marker;
    return { name, getScore, incrementScore, setMarker, getMarker };
}

function createGame() {
    // create players, and set starting player to null;
    let player1 = null;
    let player2 = null;
    let playersTurn = null;

    // getters 
    const getBoard = () => board;
    const getPlayers = () => [player1, player2];

    // create reference to game-board div in the DOM.
    const gameBoard = document.getElementById("game-board");

    // create board structure as a 2D array
    const board = []
    for (let i = 0; i < 3; i++) {
        board.push(new Array(3).fill(null));
    }

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
        }
        else {
            alert("Cannot add another player!, this is a two player game!");
        }
    }

    /* 
        play piece check if move is legal for a given player 
        for a given place on the board. 
    */

    const isGameOver = () => {

        // all tiles in row are !null and the same
        this.board[0][0] === this.board[0][1] === this.board[0][2];
        this.board[1][0] === this.board[1][1] === this.board[1][2];
        this.board[2][0] === this.board[2][1] === this.board[2][2];

        // all tiles in column are !null and the same
        this.board[0][0] === this.board[1][0] === this.board[2][0];
        this.board[0][1] === this.board[1][1] === this.board[2][1];
        this.board[0][2] === this.board[1][2] === this.board[2][2];

        // all tiles in diagonal are !null and the same
        this.board[0][0] === this.board[1][1] === this.board[2][2];
        this.board[2][0] === this.board[1][1] === this.board[0][2];

    }

    const playPiece = (player, positionX, positionY) => {
        if (player === playersTurn) {
            if (positionX > 2 || positionX < 0 || positionY > 2 || positionY < 0) {
                alert("illegal move, placement out of bounds, choose a valid location");
                return false;
            }
            if (!board[positionX][positionY]) {
                board[positionX][positionY] = player.getMarker();
                if (player === player1) {
                    playersTurn = player2
                } else {
                    playersTurn = player1;
                }
                return true;
            }
            else {
                alert("place already taken, please choose another!");
                return false;
            }
        } else {
            alert("wrong players turn!");
            return false;
        }
    }

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

                // Attach event listener to each tile
                boardTile.addEventListener("click", () => {
                    console.log(`Tile clicked at position: (${i}, ${j})`);
                    playPiece(playersTurn, i, j);
                    drawBoard(); // Redraw board after each move
                });
            }
            gameBoard.appendChild(boardRow);
        }
    }

    return { player1, player2, addPlayer, getBoard, playPiece, getPlayers, drawBoard, board, gameBoard };
}
// create players
const player1 = createPlayer("Andy");
const player2 = createPlayer("Safie");

// create game
const game = createGame();

// add players to game
game.addPlayer(player1);
game.addPlayer(player2);

// Create board in JS
game.drawBoard();