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

    let player1 = null;
    let player2 = null;
    let playersTurn = null;

    const board = []
    for (let i = 0; i < 3; i++) {
        board.push(new Array(3).fill(null));
    }

    const addPlayer = (player) => {
        if (!player1) {
            player1 = player;
            player1.setMarker("X");
            playersTurn = player1;
            return player1;
        }
        if (!player2) {
            player2 = player;
            player1.setMarker("O");
            return player2;
        }
        else {
            alert("Cannot add another player!, this is a two player game!");
        }
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
    };

    const getBoard = () => board;
    const getPlayers = () => [player1, player2];

    return { player1, player2, addPlayer, getBoard, playPiece, getPlayers, board };
}
// create players
const player1 = createPlayer("Andy");
const player2 = createPlayer("Safie");

// create game
const game = createGame();

// add players to game
game.addPlayer(player1);
game.addPlayer(player2);

game.playPiece(player1, 0, 0);
console.log(game.getBoard());

game.playPiece(player2, 2, 2);
console.log(game.getBoard());

