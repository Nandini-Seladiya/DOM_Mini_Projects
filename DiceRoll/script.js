'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0'); //getElementById is fater than querySelector
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

//Switching Player
const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling the dice
btnRoll.addEventListener('click', function() {
    if(playing) {
        //1.Genereting random number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //2.Displaying the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        
        //3.Check for rolled 1
        if(dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
        } else {
            //switch to next player
            switchPlayer();

        }
    }
})
btnHold.addEventListener('click', function() {
    if(playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1] + currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100
        if(scores[activePlayer] >= 20) {
            // Finish Game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        // Switch Player
        switchPlayer();
    }
})
btnNew.addEventListener('click', init);
