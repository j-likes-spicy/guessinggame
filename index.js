// DOM selectors
const gameNumber = document.getElementById("game_index");
const gameTarget = document.getElementById("game_target");
const userScore = document.getElementById("user_score");
const autoScore = document.getElementById("computer_score");
const autoWin = document.getElementById("computer_banner");
const userUp = document.getElementById("up");
const userDown = document.getElementById("down");
const userGuess = document.getElementById("guess");
const nextGame = document.getElementById("next_game");
const currentGuess = document.getElementById("player_guess_val");
const autoGuess = document.getElementById("computer_guess");

// Target variable
let target;

userGuess.addEventListener("click", () => {
  // call function in script.js to generate random number
  target = generateTarget();
  alert(target);
  const activeGuess = currentGuess.value;

  // declare the computer guess
  const computerGuess = Math.floor(Math.random() * 10);

  // display guess values to browser window
  autoGuess.innerText = computerGuess;
  gameTarget.innerText = target;

  // determine winner
  const playerIsWinner = compareGuesses(activeGuess, computerGuess, target);
  const winner = playerIsWinner ? "human" : "computer";

  // update current score
  updateScore(winner);
  console.log(winner);

  // display winner
  if (playerIsWinner) {
    userGuess.innerText = "Congrats, YOU are the winner!";
    // come back and toggle text banner
  } else {
    autoWin.innerText = "The computer won. The game is rigged :(!";
  }

  // display current scores
  userScore.innerText = humanScore;
  autoScore.innerText = computerScore;

  // toggle buttons to be disabled
  userGuess.setAttribute("disabled", true);
  nextGame.removeAttribute("disabled");

  console.log(computerGuess);
  console.log(currentGuess.value);
});

// Next Game Event Listener
nextGame.addEventListener("click", () => {
  // increase game number
  advanceRound();
  // display current game number on screen
  gameNumber.innerText = currentRoundNumber;

  // reset disabled button status
  nextGame.setAttribute("disabled", true);
  userGuess.removeAttribute("disabled");

  // reset display messages
  userGuess.innerText = "Make your Guess";
  autoWin.innerText = "";
  currentGuess.value = 0;
});

// User up button
userUp.addEventListener("click", () => {
  currentGuess.value = +currentGuess.value + 1;
  console.log(currentGuess.value);
  handleChange(currentGuess.value);
});

// User down button
userDown.addEventListener("click", () => {
  currentGuess.value = +currentGuess.value - 1;
  console.log(currentGuess);
  handleChange(currentGuess.value);
});

// Handle change for toggle buttons to ensure values are between 0 & 9
const handleChange = (value) => {
  if (value > 0 && value <= 9) {
    userDown.removeAttribute("disabled");
    userUp.removeAttribute("disabled");
  } else if (value > 9) {
    userUp.setAttribute("disabled", true);
  } else if (value <= 0) {
    userDown.setAttribute("disabled", true);
  }
};

currentGuess.addEventListener("input", (event) => {
  handleChange(event.target.value);
});
