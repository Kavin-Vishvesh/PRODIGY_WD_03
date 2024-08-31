const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const board = document.querySelector('.board');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winningLine = null;

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

function handleClick(event) {
    const cellIndex = cells.indexOf(event.target);
    
    if (gameBoard[cellIndex] || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        drawWinningLine();
    } else if (gameBoard.every(cell => cell)) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function drawWinningLine() {
    const winningCondition = winningConditions.find(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });

    if (!winningCondition) return;

    const [a, b, c] = winningCondition;
    
    if (a % 3 === 0 && b % 3 === 1 && c % 3 === 2) {
        drawLine('line-horizontal', a, b, c);
    } else if (a % 3 === 0 && b % 3 === 0 && c % 3 === 0) {
        drawLine('line-vertical', a, b, c);
    } else if (a === 0 && b === 4 && c === 8) {
        drawLine('line-diagonal-1', a, b, c);
    } else if (a === 2 && b === 4 && c === 6) {
        drawLine('line-diagonal-2', a, b, c);
    }
}

function drawLine(lineClass, a, b, c) {
    if (winningLine) {
        winningLine.remove();
    }
    
    winningLine = document.createElement('div');
    winningLine.className = `winning-line ${lineClass}`;
    board.appendChild(winningLine);
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
    if (winningLine) {
        winningLine.remove();
        winningLine = null;
    }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
