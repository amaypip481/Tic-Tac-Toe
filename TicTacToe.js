let GAMEBOARDSIZE = 3;
let CURRENTGAMEBOARD = {};

// Construction for a player with name & symbol selected.
//Creating it as constructor because if need more details on the player later, we use inheritance

function Player(playerName, symbol) {
    this.name = playerName;
    this.symbol = symbol;
}

// details of each celll of the grid

function gameBoardCell(elementID, isSymbolX) {
    let eachCell = { elementID, isSymbolX };
    return eachCell;
}

// //Decide who playes first

// function initializegameComputer() {
//     let choosePlayer = Math.random();
//     if (choosePlayer < 0.5)
//         return 1;
//     else return 2;
// }

//Intialize the game

function initializeGame(player1Name, player2Name, player1Symbol, player2Symbol) {
    let player1 = new Player(player1Name, player1Symbol );  // receive it from the selected button by the player
    let player2 = new Player(player2Name, player2Symbol);  // receive it from the selected button by the player
    let isPlayer1Playing = 1;

    function gameboard() {
        let gameArray = [];
        for (let i = 0; i < GAMEBOARDSIZE*GAMEBOARDSIZE; i++) {
                let elementID = "gridBoardcell" + i;
                let newcell = gameBoardCell(elementID, "");
                gameArray.push(newcell);
        }
        return gameArray;
    }

    let gameBoardArray = gameboard();

    return {gameBoardArray, player1, player2, isPlayer1Playing};
}

// function for each time the game is played

function playGame(event){

    if(CURRENTGAMEBOARD.isPlayer1Playing){

    let result = CURRENTGAMEBOARD.gameBoardArray.find((item) => {
       return item.elementID == event.target.id;
       
    });
    result.isSymbolX = 1;
    event.target.firstElementChild.innerText = "X";
    CURRENTGAMEBOARD.isPlayer1Playing =  !CURRENTGAMEBOARD.isPlayer1Playing;
}


else{
    let result = CURRENTGAMEBOARD.gameBoardArray.find((item) => {
      return  item.elementID == event.target.id;
    });
    result.isSymbolX = 0;
    event.target.firstElementChild.innerText = "O";
    CURRENTGAMEBOARD.isPlayer1Playing = !CURRENTGAMEBOARD.isPlayer1Playing;
}
checkWinner();
}

// Check for winner
function checkWinner(){
    let arrayforPlayerwithX = [];
    let arrayforPlayerwithO = [];
    CURRENTGAMEBOARD.gameBoardArray.forEach((arrayitems,index)=>{
        if(arrayitems.isSymbolX === 1)
        {
         arrayforPlayerwithX.push(index);
         if(arrayforPlayerwithX.length >= 3){
         if(checkSequence(arrayforPlayerwithX,index))
            {
                if(CURRENTGAMEBOARD.player1.symbol = "X")
                console.log(`${CURRENTGAMEBOARD.player1.name} wins`);
                else console.log(`${CURRENTGAMEBOARD.player2.name} wins`);
            }  
        }
        }
        if(arrayitems.isSymbolX === 0)
            {
             arrayforPlayerwithO.push(index);
             if(arrayforPlayerwithO.length >= 3){
             if(checkSequence(arrayforPlayerwithO,index))
                {
                    if(CURRENTGAMEBOARD.player1.symbol = "O")
                        console.log(`${CURRENTGAMEBOARD.player1.name} wins`);
                        else console.log(`${CURRENTGAMEBOARD.player2.name} wins`);
                }  
            }
            }
    });
}


function checkSequence(indexArray, index){
    if((indexArray.includes(1) && indexArray.includes(2) && indexArray.includes(0)) 
        || (indexArray.includes(4) && indexArray.includes(5) && indexArray.includes(3)) 
        || (indexArray.includes(7) && indexArray.includes(8) && indexArray.includes(6)))
        return true;
    else if((indexArray.includes(0) && indexArray.includes(3) && indexArray.includes(6)) 
        || (indexArray.includes(1) && indexArray.includes(4) && indexArray.includes(7)) 
        || (indexArray.includes(2) && indexArray.includes(5) && indexArray.includes(8)))
        return true;
    else if((indexArray.includes(0) && indexArray.includes(4) && indexArray.includes(8)) 
        || (indexArray.includes(2) && indexArray.includes(4) && indexArray.includes(6)))
    return true;

    else return false;
}


//Radio button selector

let selector = document.querySelector("#player1SymbolSelctor");

selector.addEventListener("change", ()=>{
    if(selector.value == "X")
    {
        document.querySelector("#Player2SymbolSelector").innerText = "O";
    }
    else if(selector.value == "O")
    {
        document.querySelector("#Player2SymbolSelector").innerText = "X";
    }
})

// Start button event listener

document.querySelector("#startGame").addEventListener("click", startGame);

function startGame(e){

    let player1Name = document.querySelector("#player1Name").value;
    let player2Name = document.querySelector("#player2Name").value;
    let player1Symbol = document.querySelector("#player1SymbolSelctor").value;
    let player2Symbol =document.querySelector("#Player2SymbolSelector").innerText;
    CURRENTGAMEBOARD =  initializeGame(player1Name, player2Name, player1Symbol, player2Symbol);
    document.querySelector("#playerDetails").style.display = "none";
    document.querySelector("#ticTocToeGrid").style.display = "grid";

}

// game playing event listener

let allGridDivs = document.querySelectorAll(".gridElement");

allGridDivs.forEach((item)=>{item.addEventListener("click", playGame)});




