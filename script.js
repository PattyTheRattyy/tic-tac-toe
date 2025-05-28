function Gameboard() {
    rows = 3;
    cols = 3;
    board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }
        
    
    getBoard = () => board;


    pickCell = (row, col, player) => {

        row = prompt("give row: ");
        col = prompt("give col: ");
        
        if (board[row][col].getValue() === 0){
            board[row][col].addToken(player.token);
        }
        else
            console.log("Cell taken");
    }

    printBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                console.log(board[i][j]);
            }
            console.log('\n');
        }
    }

    return { getBoard, pickCell, printBoard }
}


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player
    };

    const getValue = () => { 
        value 
    }

    return {
        addToken, getValue
    }
}

function GameController(playerOne, playerTwo) {
    board = Gameboard();
    players = [
        {   playerName: playerOne,
            token: 1
        },

        {
            playerName: playerTwo,
            token: 2
        }
    ]

    activePlayer = players[0].playerName;

    getActivePlayer = () => {
        activePlayer;
    }

    switchPlayerTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        }
        else {
            activePlayer = playerOne
        }
    }

    printNewRound = () => {
        board.printBoard();
    }

    playRound = () => {
        board.pickCell(row, col, activePlayer.token);
    }

    winCheck = () => {
        
        if (false) {
            console.log("${playerOne} won!");
            return true;
        } else {
            return false
        }

    }
    
    while (!winCheck()) {
        printNewRound();
        playRound();
        switchPlayerTurn();
    }

    return { playRound, getActivePlayer, winCheck }
}

game = GameController("player 1", "player 2");

while (!game.winCheck()) {
    game.printNewRound();
    game.playRound();
    game.switchPlayerTurn();
}
