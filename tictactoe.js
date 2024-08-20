const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'squishmallow1';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const playerImages = {
    squishmallow1: 'images/squishmallow1.png',
    squishmallow2: 'images/squishmallow2.png'
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    const img = document.createElement('img');
    img.src = playerImages[currentPlayer];
    clickedCell.appendChild(img);

    const roundWon = checkWinner();
    if (roundWon) {
        message.innerHTML = `Player ${currentPlayer} won! 🎉`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        message.innerHTML = 'Game ended in a draw! 🤝';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'squishmallow1' ? 'squishmallow2' : 'squishmallow1';
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winCondition.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            break;
        }
    }
    return roundWon;
};

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = 'squishmallow1';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winning-cell');
    });
    message.innerHTML = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
