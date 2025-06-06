function Gameboard() {
    const rows = 3;
    const cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }
        
    
    getBoard = () => board;


    pickCell = (row, col, playerToken) => {
        
        if (board[row][col].getValue() === 0){
            board[row][col].addToken(playerToken);
        }
        else
            // need to enforce this and make them pick again but i think it will be easier with the dom
            console.log("Cell taken");
    }

    printBoard = () => {
        console.log("Printing new board: ");
        let rowTxt = ""
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rowTxt += board[i][j].getValue();
            }
            console.log(rowTxt);
            console.log("\n");
            rowTxt = ""
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
        return value
    };

    return {
        addToken, getValue
    }
}

function GameController(playerOne, playerTwo) {
    const board = Gameboard();
    players = [
        {   name: playerOne,
            token: 1
        },

        {
            name: playerTwo,
            token: 2
        }
    ]

    let activePlayer = players[0];

    getActivePlayer = () => {
        return activePlayer;
    }

    switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        }
        else {
            activePlayer = players[0]
        }
    }

    printNewRound = () => {
        board.printBoard();
    }

    playRound = (row, col) => {
        board.pickCell(row, col, activePlayer.token);

        switchPlayerTurn();
        printNewRound();
    }


    // check if any of the same token is in a row, column, or diagonal

    let winner;
    let arrBoard = board.getBoard();

    rowCheck = () => {
        for (let i = 0; i < board.rows; i++) {
            let token = arrBoard[i][0].getValue();
            for (let j = 0; j < board.cols; j++) {
                if (arrBoard[i][j].getValue() != token) {
                    console.log("no winner yet");
                    break;
                } 
                if (j == 2) {
                    // console.log("row of same token");
                    if (token == players[0].token) {
                        winner = players[0];
                        console.log(`The winner is ${winner.name}!`);
                        return true;
                    } 
                    else if (token == players[1].token) {
                        winner = players[1];
                        console.log(`The winner is ${winner.name}!`);
                        return true;
                    }
                }
            }
        }
    }

    colCheck = () => {


        for (let i = 0; i < board.cols; i++) {
            let token = arrBoard[0][i].getValue();
            for (let j = 0; j < board.rows; j++) {
                
                if (arrBoard[j][i].getValue() != token) {
                    console.log("no winner yet");
                    break;
                }

                if (j == 2) {
                    console.log("col of same token");
                    if (token == players[0].token) {
                        winner = players[0];
                        console.log(`The winner is ${winner.name}!`);
                        return true;
                    } 
                    else if (token == players[1].token) {
                        winner = players[1];
                        console.log(`The winner is ${winner.name}!`);
                        return true;
                    }
                }
            }
        }
    }

    diagCheck = () => {
        token = arrBoard[0][0].getValue();

        if (token == arrBoard[1][1].getValue() && token == arrBoard[2][2].getValue()) {
            if (token == players[0].token) {
                winner = players[0];
                console.log(`The winner is ${winner.name}!`);
                return true;
            } 
            else if (token == players[1].token) {
                winner = players[1];
                console.log(`The winner is ${winner.name}!`);
                return true;
            }

        } 
        token = arrBoard[0][2].getValue();
        if (token == arrBoard[1][1].getValue() && token == arrBoard[2][0].getValue()) {
            if (token == players[0].token) {
                winner = players[0];
                console.log(`The winner is ${winner.name}!`);
                return true;
            } 
            else if (token == players[1].token) {
                winner = players[1];
                console.log(`The winner is ${winner.name}!`);
                return true;
            }
        }
    }

    tieCheck = () => {
        let freeCells = 9;
        for (let i = 0; i < board.rows; i++) {
            for (let j = 0; j < board.cols; j++) {
                if (arrBoard[i][j].getValue() != 0) {
                    freeCells--;
                    if (freeCells == 0) {
                        winner = "tie";
                        console.log("Its a tie!");
                        return true;
                    }
                }
            }
        }
    }

    winCheck = () => {
        
        if (rowCheck()) {
            return true;
        }
        if (colCheck()) {
            return true;
        }        
        if (diagCheck()) {
            return true;
        }
        if (tieCheck()){
            return true;
        }        
        return false;
    }
    
    // while (!winCheck()) {
    //     printNewRound();
    //     playRound();
    //     switchPlayerTurn();
    // }

    playRound(0,0);
    
    playRound(0,1);

    playRound(0,2);

    playRound(1,1);

    playRound(1,0);

    playRound(2,0);

    playRound(2,1);

    playRound(1,2);

    playRound(2,2);


    rowCheck();
    colCheck();
    diagCheck();
    tieCheck();
    

    return { playRound, getActivePlayer, winCheck }
}


function ScreenController() {
    const game = GameController("player 1", "player 2");
    const turnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        // clear screen
        boardDiv.textContent = "";

        // get active player
        let activePlayerTest = game.getActivePlayer();

        // display active players turn
        turnDiv.textContent = `${activePlayerTest.name}'s turn...`;

        // render board
        for (let i = 0; i < Gameboard.board.rows; i++) {
            for (let j = 0; j < Gameboard.board.cols; j++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");

                boardDiv.appendChild(cell);


            }
        }
    }
    updateScreen();
}


ScreenController();



