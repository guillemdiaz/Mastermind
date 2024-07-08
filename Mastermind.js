/* Initializes a new player. */
function Player(name, wins, loses) {
    this.name = name;
    this.wins = wins;
    this.loses = loses;
}

let initial_rounds;
let initial_clues;

/* Sets the initial value for the clues and the rounds. */
function setInitialValues() {
    initial_clues = parseInt(document.getElementById("clue-input").value, 10);
    initial_rounds = parseInt(document.getElementById("round-input").value, 10);
    if (initial_rounds < 0 || initial_rounds > 15 || initial_clues < 0 || initial_clues > 4)
        alert("Incorrect input!\nMax no. of clues is 4 and max no. of rounds is 15.");
}

/* List to control the indexes of the visited digits of the number to guess. */
let random_index;

let numberToGuessNumbers;

let numberToGuess;
let round;
let maxRound;
let clues;

/* Sets the default value for all the global variables. */
function setDefault() {
    numberToGuess = ""; // Number to guess (string).
    round = 1; // Round number.
    maxRound = initial_rounds;
    clues = initial_clues; // Number of clues the player has.
    random_index = []; // Stores the visited indexes of the number to guess when asking for a clue.
    numberToGuessNumbers = [];
}

const player = new Player("", 0, 0);

/* Adds keypress functionality so when the player hits the Enter key,
   the game reads the text inside the input and simulates the button's onclick
   function (depending on whether he is entering his name (Play!) or guessing
   the number (Guess!)). */
document.addEventListener("keypress", function onEvent(event) {
    const button = document.getElementsByTagName("button");
    if (event.key === "Enter") {
        // If there is only one button it means that the player is still entering its name
        if (button.length === 1) button[0].click();
        else button[1].click();
    }
});

/* Loads the game after reading the input. */
function load() {
    setInitialValues();
    setDefault();
    updatePlayerInformation();
    createResult();
    updateRoundNumber();
    const guesses = document.createElement("table");
    const introInfo = document.getElementById("introInfo");
    introInfo.insertBefore(guesses, introInfo.children[2]);
    initializeGuessesTable();
    createGuessButtonAndClue();
    createResetAndEndButton();
}

/* Plays a new match. */
function newMatch() {
    setDefault();
    updateRoundNumber();
    updateResult();
    initializeGuessesTable();
}

/* Plays a new round after the input is read. */
function newRound(input) {
    const number = input.toString().slice(0, 4);
    const playerWon = rightGuess(number);
    // If the number is guessed right.
    if (playerWon) {
        alert(`Congratulations ${player.name}!!!!`);
        player.wins++;
        newMatch();
    } else { // If the number is not guessed right.
        round++;
        // Checks if the player has reached more than max rounds.
        if (round > maxRound) {
            alert(`${player.name}, you have lost!\nThe number was ${numberToGuess}`);
            player.loses++;
            newMatch();
        } else {
            updateRoundNumber();
            updateGuessesTable(number);
        }
    }
}

/* Updates player's information (name). */
function updatePlayerInformation() {
    const title = document.getElementsByTagName("h2")[0];
    // If the player doesn't provide any name after pressing "Enter" or clicking the Play button, a default player name is given to him
    player.name = document.getElementById("input").value || "Player 1";
    title.textContent = player.name;
}

/* Creates the result section. */
function createResult() {
    const introInfo = document.getElementById("introInfo");
    introInfo.removeChild(introInfo.children[2]);
    const result = document.createElement("p");
    introInfo.insertBefore(result, introInfo.children[1]);
    const inputInfo = document.getElementById("inputInfo");
    while (inputInfo.children.length > 2) inputInfo.removeChild(inputInfo.lastChild);
    updateResult();
}

/* Updates player's result. */
function updateResult() {
    const result = document.getElementById("introInfo").children[1];
    result.textContent = `Wins: ${player.wins}, Loses: ${player.loses}`;
    result.className = "result";
}

/* Updates the round number. */
function updateRoundNumber() {
    const label = document.getElementsByTagName("span")[0];
    label.textContent = `Round ${round}:`;
    const input = document.getElementById("input");
    input.value = "";
}

/* Initializes a table to display the guessed numbers and the number to guess. */
function initializeGuessesTable() {
    const guesses = document.getElementsByTagName("table")[0];
    // Deletes all rows after a win or a loss
    while (guesses.rows.length > 0) {
        guesses.deleteRow(0);
    }
    const tr = guesses.insertRow(-1);
    tr.className = "first-row";
    for (let i = 0; i < 8; i++) {
        const cell = tr.insertCell(i);
        if (i < 4) {
            // Creates a random digit (0-9) and stores it in a variable.
            const random_number = Math.floor(Math.random() * 10).toString();
            numberToGuess += random_number;
            numberToGuessNumbers.push(random_number);
            cell.textContent = "0";
        } else if (i === 4) {
            cell.innerHTML = '<img src="okay-icons/ok-green-icon.png" alt="ok-green-icon"/>';
        } else if (i === 6) {
            cell.innerHTML = '<img src="okay-icons/ok-orange-icon.png" alt="ok-orange-icon"/>';
        } else {
            cell.textContent = "0";
        }
    }
}

/* Updates the table so that it shows each time the number guessed by the
   player, the right digits guessed and the digits that are in the number
   to guess. */
function updateGuessesTable(number) {
    const guesses = document.getElementsByTagName("table")[0];
    const tr = guesses.insertRow(-1);
    tr.className = "row";
    let rightGuess = 0;
    let almostRightGuess = 0;
    const digits = [...numberToGuessNumbers];
    for (let i = 0; i < 8; i++) {
        const cell = tr.insertCell(i);
        // Green okay icon.
        if (i === 4) {
            cell.innerHTML = '<img src="okay-icons/ok-green-icon.png" alt="ok-green-icon"/>';
        } else if (i === 5 || i === 7) {
        } else if (i === 6) { // Orange okay icon.
            cell.innerHTML = '<img src="okay-icons/ok-orange-icon.png" alt="ok-orange-icon"/>';
        } else {
            cell.textContent = number[i];
            // Controls right guesses and almost right guesses.
            if (digits.includes(number[i])) {
                almostRightGuess++;
                const index = digits.indexOf(number[i]);
                digits.splice(index, 1);
            }
            if (number[i] === numberToGuess[i]) {
                rightGuess++;
                almostRightGuess--;
            }
        }
    }
    tr.cells[5].textContent = rightGuess.toString();
    tr.cells[7].textContent = almostRightGuess.toString();
    // Moves the scroll bar to the end of the page so the player doesn't have to.
    // It is thought for the cases in which the page increases its height due to
    // the insertion of more rows in the table (more rounds).
    window.scrollTo(0, document.body.scrollHeight);
}

/* Creates the guess button and the clue icon. */
function createGuessButtonAndClue() {
    // Focus on the input (number that the user has to guess).
    document.getElementById("input").focus();
    const guessButton = document.createElement("button");
    guessButton.onclick = function () {
        const input = document.getElementById("input").value;
        // Checks if input is numeric and has a length of 4
        // If not, displays an alert.
        if (input.length === 4 && !isNaN(input)) newRound(input);
        else {
            alert("Incorrect input");
            document.getElementById("input").value = "";
        }
    };
    guessButton.textContent = "Guess!";
    const inputInfo = document.getElementById("inputInfo");
    inputInfo.appendChild(guessButton);
    const clue = document.createElement("button");
    const introInfo = document.getElementById("introInfo");
    introInfo.insertBefore(clue, introInfo.children[2]);
    clue.className = "bulb";
    // Adds onclick function to the clue icon (the bulb) so when it is clicked,
    // a random index of the numberToGuess variable will be chosen and the digit
    // in that position will be displayed.
    clue.onclick = function () {
        const first_row = document.getElementsByTagName("tr")[0];
        let n = Math.floor(Math.random() * 4);
        while (random_index.includes(n) && random_index.length < 4)
            n = Math.floor(Math.random() * 4);
        random_index.push(n);
        // The clues variable controls the number of clues the player has.
        if (clues > 0) {
            first_row.cells[n].textContent = numberToGuess[n];
            first_row.cells[n].className = "show-result";
            clues--;
        }
    };
}

/* Adds a reset and an end button. */
function createResetAndEndButton() {
    const resetButton = document.createElement("button");
    const endButton = document.createElement("button");
    // The onclick function of the reset button resets the game to its
    // initial condition (after the player enters his name).
    resetButton.onclick = function () {
        player.wins = player.loses = 0;
        newMatch();
    };
    resetButton.textContent = "Reset";
    resetButton.className = "reset";
    // The onclick function of the end button displays an alert
    // telling the player if they won the game or not and reloads the page,
    // so the game comes back to its initial state.
    endButton.onclick = function () {
        displayGameResult();
        location.reload();
    };
    endButton.textContent = "End";
    endButton.className = "end";
    const inputInfo = document.getElementById("inputInfo");
    inputInfo.appendChild(endButton);
    inputInfo.appendChild(resetButton);
}

/* Checks if the number guessed by the player is actually the number to guess
   Returns false if not, true otherwise. */
function rightGuess(number) {
    for (let i = 0; i < 4; i++) {
        if (number[i] !== numberToGuess[i]) return false;
    }
    return true;
}

/* Displays with an alert the result of the game. */
function displayGameResult() {
    if (player.wins > player.loses)
        alert(`Congrats ${player.name}! You won the game!`);
    else if (player.loses > player.wins)
        alert(`I'm sorry ${player.name}... You lost the game!`);
    else alert("It was a tied game!");
}
