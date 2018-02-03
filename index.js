"use strict";

var Alexa = require("alexa-sdk");

var randomNum = 0
var turns = 0

var handlers = {
  'LaunchRequest': function() {
    randomNum = Math.floor(Math.random()*11)

    this.response.speak("Welcome to the High Low Game. I am thinking of a number from zero to ten. If you guess the number correctly in five tries, you win. Take a guess.").listen("Guess a number from zero to ten.");
    this.emit(':responseReady');
  },

  // Number guess function
  'NumberIntent': function () {
    var guess = this.event.request.intent.slots.number.value;

    if(turns < 4) {
        if(guess > 10) {
            this.response.speak("Please guess a number from zero to ten.").listen("Please guess a number from zero to ten.")
        } else if(guess == randomNum) {
            this.response.speak("Yay! " + guess + " is the number I was thinking of. You win! Thank you for playing the High Low Game, let\'s play again soon.");
        } else if(guess > randomNum) {
            this.response.speak(guess + " is too high. Try again.").listen("Guess again.");
        } else if(guess < randomNum) {
            this.response.speak(guess + " is too low. Try again.").listen("Guess again.");
        }
    } else {
        if(guess > 10) {
            this.response.speak("Please guess a number from zero to ten.").listen("Please guess a number from zero to ten.")
        } else if(guess == randomNum) {
            this.response.speak("Yay! " + guess + " is the number I was thinking of. You win! Thank you for playing the High Low Game, let\'s play again soon.");
        } else if(guess > randomNum) {
            this.response.speak(guess + " is too high. You ran out of turns. You lose. Try again next time.");
        } else if(guess < randomNum) {
            this.response.speak(guess + " is too low. You ran out of turns. You lose. Try again next time.");
        }
    }
    turns++
    this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function() {
      this.response.speak('I am thinking of a number from zero to ten. Guess the number correctly, and you win. ').listen("Guess a number from zero to ten.");
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  }

};



exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
