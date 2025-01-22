let isTwoPlayerMode = false;
let flippedCards = [];
let matchedCards = [];
let currentPlayer = 1;

// Emoji-Liste für das 4x4 Layout
const symbols = [
    '🎸', '🥃', '💋', '🎤', 
    '💊', '🍺', '🎶', '🔥',
    '🎧', '🎷'
];

let cards = [...symbols, ...symbols];

// Funktion zum Mischen der Karten
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Startbildschirm anzeigen
function showGameModeScreen() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'flex';
}

// Zurück zum Startbildschirm
function goToStartScreen() {
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
}

// Spielmodus starten
function startGame(mode) {
    isTwoPlayerMode = (mode === 2);
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    currentPlayer = 1;
    updateTurnIndicator();
    createBoard();
}

// Spielfeld aufbauen
function createBoard() {
    shuffle(cards);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Karte umdrehen
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.textContent = this.dataset.symbol;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

// Karten abgleichen
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');

        if (isTwoPlayerMode) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateTurnIndicator();
        }
    }
    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert(`Spieler ${currentPlayer} gewinnt!`), 500);
    }
}

// Spieleranzeige aktualisieren
function updateTurnIndicator() {
    document.getElementById('turn-indicator').textContent = 
        isTwoPlayerMode ? `Spieler ${currentPlayer} ist am Zug` : `Finde alle Paare!`;
}

// Spiel neu starten
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    currentPlayer = 1;
    updateTurnIndicator();
    createBoard();
}