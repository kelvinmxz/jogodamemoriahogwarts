const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


const playerName = localStorage.getItem('player') || 'Jogador';
let points = 0;

let startTime = Date.now();
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    const now = Date.now();
    const seconds = Math.floor((now - startTime) / 1000);
    document.getElementById('timer').textContent = seconds + 's';
}

// Adicione o timer no placar, se ainda não existir
if (!document.getElementById('timer')) {
    const timerSpan = document.createElement('span');
    timerSpan.id = 'timer';
    timerSpan.style.marginLeft = '10px';
    timerSpan.textContent = '0s';
    document.getElementById('scoreboard').appendChild(timerSpan);
}

document.getElementById('player-name').textContent = playerName;
document.getElementById('points').textContent = points;


document.getElementById('player-name').textContent = playerName;
document.getElementById('points').textContent = points;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    points += 1;
    document.getElementById('points').textContent = points;

  if (points === 6) {
        clearInterval(timerInterval);
        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = `
            <strong>Parabéns, ${playerName}!</strong><br>
            Você completou o jogo em ${totalSeconds} segundos.<br>
            
        `;
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 5000);
        return;
    }

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});