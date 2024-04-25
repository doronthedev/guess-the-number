let randomNumber;
let guess;
let score = 20;
let highScore = 0;
let range = 20;
let isPlay = false;

const guessElement = document.querySelector('.user-guess input');
const feedback = document.querySelector('.feedback');
const mysteryNumber = document.querySelector('.mystery-number');
const rangeDisplay = document.querySelector('.range-display');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');

document.querySelector('.lower-range').addEventListener('click', decreaseRange);
document.querySelector('.upper-range').addEventListener('click', increaseRange);
document.querySelector('.start-game').addEventListener('click', game);
document.querySelector('.submit-guess').addEventListener('click', userGuess);
document.querySelector('.play-again').addEventListener('click', resetGame);

function increaseRange() {
  if (isPlay) return;
  if (range >= 100) return;

  range++;
  rangeDisplay.textContent = `Between 1 and ${range}`;
  guessElement.max = range;
}

function decreaseRange() {
  if (isPlay) return;
  if (range <= 10) return;

  range--;
  rangeDisplay.textContent = `Between 1 and ${range}`;
  guessElement.max = range;
}

function resetGame() {
  score = 20;
  isPlay = false;
  randomNumber = 0;
  guessElement.value = 1;

  scoreDisplay.textContent = `Score: 20`;
  mysteryNumber.textContent = '?';
  document.body.style.background = '';
  feedback.textContent = 'Start guessing...';
}

function game() {
  if (isPlay === true) resetGame();

  isPlay = true;

  const min = 1;
  const max = range + 1;

  randomNumber = Math.floor(Math.random() * (max - min) + min);
}

function userGuess() {
  if (!isPlay) return;

  guess = Number(guessElement.value);

  if (guess < 1 || guess > range) {
    guessElement.value = 1;
    guess = 1;
    return;
  }

  if (guess === randomNumber) {
    if (score > highScore) {
      highScore = score;
      highscoreDisplay.textContent = `Highscore: ${score}`;
    }

    feedback.textContent = 'Correct Number';
    mysteryNumber.textContent = randomNumber;
    document.body.style.backgroundColor = 'rgb(62 133 133)';
    return;
  }

  score--;
  scoreDisplay.textContent = `Score: ${score}`;

  if (guess >= randomNumber) {
    feedback.textContent = 'Too High';
    return;
  }

  if (guess <= randomNumber) {
    feedback.textContent = 'Too Low';
  }
}
