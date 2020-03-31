const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
};
const Max = 10;
// Play game
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
    finalwinner(scoreboard);
}

// Get computers choice
function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Get game winner
function getWinner(p, c) {
    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        // Inc player score
        scoreboard.player++;
        // Show modal result
        result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    } else if (winner === 'computer') {
        // Inc computer score
        scoreboard.computer++;
        // Show modal result
        result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    } else {
        result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    }
    // Show score
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = 'block';
}


// Restart game
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

// Final score 

function finalwinner(scoreboard) {
    if (scoreboard.player === Max) {
        result.innerHTML = `
        <h1 class="text-win">You Finished First</h1>
        <p>Your Score <strong>${scoreboard.player}</strong></p>
        <p>Computer Score <strong>${scoreboard.computer}</strong></p>
      `;
        restartGame();
    } else if (scoreboard.computer === Max) {
        result.innerHTML = `
        <h1 class="text-win">Computer Finished First</h1>
        <p>Your Score <strong>${scoreboard.player}</strong></p>
        <p>Computer Score <strong>${scoreboard.computer}</strong></p>
      `;
        restartGame();
    }
}

// Clear modal
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
window.addEventListener('click', finalwinner);