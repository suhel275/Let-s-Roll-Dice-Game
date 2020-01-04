/*

GAME RULES:

- The game has 2 players, playing in rounds .
- Playes have to set the winning score . The first player to reach winning score on global score wins the game .
- In each turn, a player rolls two dice as many times as he wishes. 
- Sum of 2 dice get added to his current score and anytime he can 'Hold' and add his current score to global score. After that, it's the next player's turn
- But, if the player rolls and gets 1 on any dice , all his current score gets lost. After that, it's the next player's turn

*/

var scores, activePlayer, rounScore, dice, gamePlaying;

function init() {
  lastDice = 0;
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

init();

function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1)random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    var diceDom1 = document.querySelector('#dice-1');
    var diceDom2 = document.querySelector('#dice-2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + '.png';
    diceDom2.src = 'dice-' + dice2 + '.png';
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      gamePlaying = false;
    } else {
      lastDice = 0;
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
