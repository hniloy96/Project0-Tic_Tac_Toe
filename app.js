console.log("loaded")

const cells = document.querySelectorAll('.cell')
console.log(cells)

const statusText = document.querySelector(".status-text");
const resetButton = document.querySelector("#reset-button");
const postGame = document.querySelector(".post-game");
const postGameText = document.querySelector("#post-game-text");
console.log(postGameText)
console.log(postGame)

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
console.log(winCombinations)

let submits = ["", "", "", "", "", "", "", "", ""];

let runningPlay = "X"
let running = false;

startGame()

function startGame(){
    cells.forEach( cell => {cell.addEventListener('click', cellclicked)})
    resetButton.addEventListener('click', resetGame);
    statusText.textContent = `Player ${runningPlay}'s turn!`;
    running = true;
}

function cellclicked(){
    console.log("clicked")
    const cellIndex = this.getAttribute("cellIndex");
    if(submits[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();

}

function updateCell(cell, index){
    submits[index] = runningPlay;
    cell.textContent = runningPlay;
}

function changePlayer(){
    runningPlay = (runningPlay == "X") ? "O" : "X";
    statusText.textContent = `Player ${runningPlay}'s turn!`;
}


function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winCombinations.length; i++){
        const condition = winCombinations[i]
        const boxA = submits[condition[0]]
        const boxB = submits[condition[1]]
        const boxC = submits[condition[2]]

        if (boxA == "" || boxB == "" || boxC == ""){
            continue;
        } if (boxA == boxB && boxB == boxC){
            roundWon = true;
            break;
        }
        
    }

    if(roundWon){
        running = false;
        postGameText.innerHTML = `Player ${runningPlay} WINS!`
        postGame.classList.add('show')
        statusText.classList.add('hide')
        console.log(postGame)
    } else if (!submits.includes("")){
        running = false;
        postGameText.innerHTML = `It was a Draw!`
        postGame.classList.add('show')
        statusText.classList.add('hide')
        console.log(postGame)
    } else {
        changePlayer();
    }
}


function resetGame(){
    runningPlay = "X";
    submits = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {cell.textContent = ''})
    statusText.classList.remove('hide')
    postGame.classList.remove('show')
    statusText.textContent = `Player ${runningPlay}'s turn!`;
    running = true;
}