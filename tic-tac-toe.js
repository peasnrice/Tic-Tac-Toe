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

    const board = []
    for (let i = 0; i < 3; i++) {
        board.push(new Array(3).fill(null));
    }

    const addPlayer = (player) => {
        if (!player1) {
            player1 = player;
            player1.setMarker("X");
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
    const playPiece = (player, position) => {
        if (board[position.x, position.y]) {

        }
    };

    const getBoard = () => board;
    const getPlayers = () => [player1, player2];

    return { player1, player2, addPlayer, getBoard, playPiece, getPlayers, board };
}

const player1 = createPlayer("Andy");
const player2 = createPlayer("Safie");
const game = createGame();
game.addPlayer(player1);
game.addPlayer(player2);

console.log(game.getBoard());
console.log(game.getPlayers());