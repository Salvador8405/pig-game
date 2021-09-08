function rules() {
  var displayWidth = window.innerWidth;
  var displayHeight = window.innerHeight;
  alert(
    "Hi \n my name is Mohammad Mahdi Dehghan \n wellcome to a simple 'PIG GAME' \n default display resolution = '1280 * 1024' \n your resolution is " +
      displayWidth +
      " * " +
      displayHeight
  );
  alert(
    "how to play PIG GAME ? \n \n you should be 2 persons to play this game, one is player 1 and other one is player 2 , press 'Roll dice' to roll a dice with random side(between 1-6). this score will add to your current score which means it won't save, if you roll dice and get '1' the current score will refresh to 0 , so when your current score reach to a good value press 'Hold' to save your current score to your main score. \n when a player's main score reach to 30 or more , he/she is the winner! \n let's play"
  );
}

// important variables

const diceElement = document.getElementById("dice");
const player1Total = document.getElementById("score--0");
const player2Total = document.getElementById("score--1");
const player1Current = document.getElementById("current--0");
const player2Current = document.getElementById("currnet--1");

let currentScore = 0;

// who's playing and who's not :

let activePlayer = 0;
let unactivePlayer = 1;

// when user clicked on roll button :

var rollButton = document.getElementById("roll");

rollButton.addEventListener("click", () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceElement.src = `dice/side${dice}.png`;
  diceElement.classList.remove("hidden");

  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).innerHTML =
      currentScore;
  } else {
    playerSwitch();
  }
});

// switch between player 1 and 2 turns

const playerSwitch = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  active();
  document.querySelector(`#player--${activePlayer}`).style.backgroundColor =
    "blue";
  document.querySelector(`#player--${unactivePlayer}`).style.backgroundColor =
    "lightblue";
};

let scores = [0, 0];

// when user clicked on hold button :

var holdButton = document.querySelector("#hold");

holdButton.addEventListener("click", () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).innerHTML =
    scores[activePlayer];

  // win condition :

  if (scores[activePlayer] >= 30) {
    endGame();
  } else {
    playerSwitch();
  }
});

// discover which player is the active one

function active() {
  if (activePlayer === 0 && unactivePlayer === 1) {
    activePlayer = 1;
    unactivePlayer = 0;
  } else if (activePlayer === 1 && unactivePlayer === 0) {
    activePlayer = 0;
    unactivePlayer = 1;
  }
}

// restart the game

function startGame() {
  location.reload(true);
}

// when a player won the game :

function endGame() {
  var playerActive = document.querySelector(`#player--${activePlayer}`);
  var playerUnactive = document.querySelector(`#player--${unactivePlayer}`);

  rollButton.disabled = true;
  holdButton.disabled = true;
  playerActive.style.color = "black";
  playerActive.style.backgroundColor = "green";
  playerUnactive.style.color = "red";
  playerUnactive.style.backgroundColor = "#c7365f";
  document.querySelector(`.winner--${activePlayer}`).style.visibility = "unset";
  document.querySelector(`.loser--${unactivePlayer}`).style.visibility =
    "unset";
}

var startButton = document.querySelector("#startGame");

startButton.addEventListener("click", startGame);
