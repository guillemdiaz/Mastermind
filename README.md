# Mastermind Game

This is a recreation of the Mastermind game. You can play it 
[here](https://guillemdiaz.github.io/Mastermind/).

## Overview

The Mastermind game is a classic code-breaking game where the player tries to 
guess a 4-digit number within a certain number of rounds, with optional clues 
provided. This project was developed as part of a university subject.

## Features

### Main Page

On the main page, the player can enter:
- **Name**: If left blank, a default name "Player 1" will be assigned.
- **Number of Rounds**: Up to 15 rounds can be played. If an invalid number is 
                        entered, an error will be displayed.
- **Number of Clues**: Up to 4 clues can be used. If an invalid number is 
                       entered, an error will be displayed.

The player can start the game by clicking the "Play!" button or pressing the 
Enter key, which also works for the "Guess!" button during the game.

### Game Page

On the game page, the player:
- Tries to guess the 4-digit number. An error will be displayed if the input is 
  not a valid 4-digit number.
- Receives feedback on whether the guess was correct or how close it was.
- Can use the **'Reset'** button to reset the game, with results updated to 0 
  and a new number generated.
- Can use the **'End'** button to restart the entire game from the main page 
  (effectively a page reload).
- Can click the **Clue/Bulb Icon** to reveal a digit of the number if clues are 
  available. The number of clues is determined on the main page.

### Additional Features

- **Autofocus**: Input fields are automatically focused on both the main page 
                 and the game page, so the player doesn't need to click on 
                 the input to start typing.
- **Scroll Functionality**: Automatically scrolls to the bottom of the page when
                            more than 10 rounds are played and the table 
                            exceeds the screen height, allowing the player to 
                            continue entering numbers without manually 
                            adjusting the scroll.

## Project Information

This project was developed as part of a university subject.

Enjoy the game and good luck!
