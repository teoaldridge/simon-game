var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

//Game Level
var level = 0;

//Detecting whether the game has started, so we can only activate nextSequence() on the first keypress.
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Detect which button is clicked, activate animation and corresponding sound, and add to user's clicked pattern.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  console.log(userClickedPattern);

  //Check the Answer
  checkAnswer(userClickedPattern.length - 1);
});

//Check Answer Function
function checkAnswer(currentLevel) {

  //Check whether the last clicked answer matches the game pattern so far.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //Check whether the user has finished their sequence.
    if (userClickedPattern.length === gamePattern.length) {

      //Call the next sequence after 1000ms delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    wrongAnswerSound();
    animateWrongAnswer();
    $("#level-title").text("Game over. Press any key to restart!");
    startOver();
  }
}

//Add a random colour, add flashing animation and corresponding sound, and add them to the sequence of the game pattern.
function nextSequence() {

  //Reset userClickedPattern
  userClickedPattern = [];

  //Increase the level by 1 every time the fucntion is called, and change the title accordingly.
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  console.log(gamePattern);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


//Playing a corresponding sound to the colour pressed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation effect when pressing a colour
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Sound effect when the answer is wrong
function wrongAnswerSound() {
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play()
}

//Animation effect when the answer is wrong
function animateWrongAnswer() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}
