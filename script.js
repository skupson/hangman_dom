const wordElement = document.getElementById("word");
const wrongLettersElelement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["wizard", "interface", "dungeon", "dragons"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];

const wrongLetters = [];

let mistakes = 0;

// End the game, player lost
function endGame() {
  finalMessage.textContent = "You've lost!";
  popup.classList.add("show");
}

// Restart the game
function newGame() {
  location.reload();
}

// Update the wrong letters
function updateWrongLettersElement(letter) {
  wrongLetters.push(letter);
  figureParts[mistakes].classList.add("show");
  mistakes + 1 >= figureParts.length ? end_Game() : (mistakes += 1);
}

// Show notifications
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 1000);
}

// Show the hidden word
function displayWord() {
  wordElement.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) =>
              `<span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>`
          )
          .join("")}    
    `;
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  console.log(innerWord, selectedWord);
  if (innerWord == selectedWord) {
    finalMessage.textContent = "You've won!";
    popup.classList.add("show");
  }
}

// Get the letter from the user input
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    var letter = e.key;
  }

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);

      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLettersElement();
    } else {
      showNotification();
    }
  }
});

// Play again button
playAgainBtn.addEventListener("click", newGame);

displayWord();
