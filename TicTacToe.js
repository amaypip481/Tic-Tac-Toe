let GAMEBOARDSIZE = 3;
let CURRENTGAMEBOARD = {};

// Construction for a player with name & symbol selected.
//Creating it as constructor because if need more details on the player later, we use inheritance

function Player(playerName, symbol) {
    this.name = playerName;
    this.symbol = symbol;
}

// details of each celll of the  - later chnaged to flex

function gameBoardCell(elementID, isSymbolX) {
    let eachCell = { elementID, isSymbolX };
    return eachCell;
}


//Intialize the game

function initializeGame(player1Name, player2Name, player1Symbol, player2Symbol) {
    let player1 = new Player(player1Name, player1Symbol);  // receive it from the selected button by the player
    let player2 = new Player(player2Name, player2Symbol);  // receive it from the selected button by the player
    let isPlayer1Playing = 1;
    let attemptCount = 0;

    function gameboard() {
        let gameArray = [];
        for (let i = 0; i < GAMEBOARDSIZE * GAMEBOARDSIZE; i++) {
            let elementID = "gridBoardcell" + i;
            let newcell = gameBoardCell(elementID, "");
            gameArray.push(newcell);
        }
        return gameArray;
    }

    let gameBoardArray = gameboard();

    return { gameBoardArray, player1, player2, isPlayer1Playing, attemptCount };
}

// function for each time the game is played

function playGame(event) {

    if (CURRENTGAMEBOARD.isPlayer1Playing) {

        let result = CURRENTGAMEBOARD.gameBoardArray.find((item) => {
            return item.elementID == event.target.id;

        });
        result.isSymbolX = 1;
        event.target.firstElementChild.innerText = "X";
        CURRENTGAMEBOARD.isPlayer1Playing = !CURRENTGAMEBOARD.isPlayer1Playing;
    }


    else {
        let result = CURRENTGAMEBOARD.gameBoardArray.find((item) => {
            return item.elementID == event.target.id;
        });
        result.isSymbolX = 0;
        event.target.firstElementChild.innerText = "O";
        CURRENTGAMEBOARD.isPlayer1Playing = !CURRENTGAMEBOARD.isPlayer1Playing;
    }
    CURRENTGAMEBOARD.attemptCount++;
    if (CURRENTGAMEBOARD.attemptCount > 4) {
        let isWinnerAnnounced =false;
        checkWinner(isWinnerAnnounced);
        if (CURRENTGAMEBOARD.attemptCount == 9 && !checkWinner(isWinnerAnnounced))
            goForDraw();
    }



}

// Check for winner
function checkWinner(isWinnerAnnounced) {
    let arrayforPlayerwithX = [];
    let arrayforPlayerwithO = [];
    CURRENTGAMEBOARD.gameBoardArray.forEach((arrayitems, index) => {
        if (arrayitems.isSymbolX === 1) {
            arrayforPlayerwithX.push(index);
            if (arrayforPlayerwithX.length >= 3) {
                if (checkSequence(arrayforPlayerwithX, index)) {
                    if (CURRENTGAMEBOARD.player1.symbol === "X") {
                        announcementText(CURRENTGAMEBOARD.player1.name);
                        isWinnerAnnounced = true;
                    }
                    else {
                        announcementText(CURRENTGAMEBOARD.player2.name);
                        isWinnerAnnounced = true;
                    }
                }
            }
        }
        if (arrayitems.isSymbolX === 0) {
            arrayforPlayerwithO.push(index);
            if (arrayforPlayerwithO.length >= 3) {
                if (checkSequence(arrayforPlayerwithO, index)) {
                    if (CURRENTGAMEBOARD.player1.symbol === "O") {
                        announcementText(CURRENTGAMEBOARD.player1.name);
                        isWinnerAnnounced = true;
                    }
                    else {
                        announcementText(CURRENTGAMEBOARD.player2.name);
                        isWinnerAnnounced = true;
                    }
                }
            }
        }
    });
    return isWinnerAnnounced;
}

function announcementText(name) {
    document.querySelector("#resultAnnouncement").firstElementChild.innerText = `${name} wins!!`;
    document.querySelector("#resultAnnouncement").style.display = "flex";

}

// Check for draw
function goForDraw() {
    document.querySelector("#resultAnnouncement").firstElementChild.innerText = `It's a Draw!`;
    document.querySelector("#resultAnnouncement").style.display = "flex";
}


function checkSequence(indexArray, index) {
    if ((indexArray.includes(1) && indexArray.includes(2) && indexArray.includes(0))
        || (indexArray.includes(4) && indexArray.includes(5) && indexArray.includes(3))
        || (indexArray.includes(7) && indexArray.includes(8) && indexArray.includes(6)))
        return true;
    else if ((indexArray.includes(0) && indexArray.includes(3) && indexArray.includes(6))
        || (indexArray.includes(1) && indexArray.includes(4) && indexArray.includes(7))
        || (indexArray.includes(2) && indexArray.includes(5) && indexArray.includes(8)))
        return true;
    else if ((indexArray.includes(0) && indexArray.includes(4) && indexArray.includes(8))
        || (indexArray.includes(2) && indexArray.includes(4) && indexArray.includes(6)))
        return true;

    else return false;
}


//Radio button selector

let selector = document.querySelector("#player1SymbolSelctor");

selector.addEventListener("change", () => {
    if (selector.value == "X") {
        document.querySelector("#Player2SymbolSelector").innerText = "O";
    }
    else if (selector.value == "O") {
        document.querySelector("#Player2SymbolSelector").innerText = "X";
    }
})

// Start button event listener

document.querySelector("#startGame").addEventListener("click", startGame);

function startGame(e) {
    let player1Name = document.querySelector("#player1Name").value;
    let player2Name = document.querySelector("#player2Name").value;
    if (player1Name === "") {
        document.querySelector("#player1Name").style.border = "3px solid red";
        return;
    }
    else if (player2Name === "") {
        document.querySelector("#player2Name").style.border = "3px solid red";
        return;
    }
    let player1Symbol = document.querySelector("#player1SymbolSelctor").value;
    let player2Symbol = document.querySelector("#Player2SymbolSelector").innerText;
    CURRENTGAMEBOARD = initializeGame(player1Name, player2Name, player1Symbol, player2Symbol);
    document.querySelector("#playerDetails").style.display = "none";
    document.querySelector("#ticTocToeGrid").style.display = "grid";
    document.querySelector("#ticTacToeGridContainer").style.display = "flex";
    document.querySelector("#player1SymbolDiv").innerText = `${player1Name} selects "${player1Symbol}"`;
    document.querySelector("#player2SymbolDiv").innerText = `${player2Name} selects "${player2Symbol}"`;

}

// game playing event listener

let allGridDivs = document.querySelectorAll(".gridElement");

allGridDivs.forEach((item) => { item.addEventListener("click", playGame) });

// Reset button listener
document.querySelector("#resultAnnouncementButton").addEventListener("click", restartGame);

function restartGame() {
    let gridElementList = document.querySelectorAll(".gridElement");
    gridElementList.forEach((item) => { item.firstElementChild.innerText = "" });
    document.querySelector("#playerDetails").style.display = "flex";
    document.querySelector("#ticTocToeGrid").style.display = "none";
    document.querySelector("#ticTacToeGridContainer").style.display = "none";
    document.querySelector("#resultAnnouncement").style.display = "none";
    document.querySelector("#player1Name").value = "";
    document.querySelector("#player2Name").value = "";
    CURRENTGAMEBOARD = {};
}


// Restart button listener
document.querySelector("#continueSameGame").addEventListener("click", resetgame);

function resetgame() {
    let gridElementList = document.querySelectorAll(".gridElement");
    gridElementList.forEach((item) => { item.firstElementChild.innerText = "" });
    document.querySelector("#resultAnnouncement").style.display = "none";
    CURRENTGAMEBOARD = initializeGame(CURRENTGAMEBOARD.player1.name, CURRENTGAMEBOARD.player2.name, CURRENTGAMEBOARD.player1.symbol, CURRENTGAMEBOARD.player2.symbol);
}

