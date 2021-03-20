//global variables
var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var userChosenColor;
var level = 0;
var started = false;




//check for first keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();

    started = true;
  }
});


//which button clicked and call functions
$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
});


//check for answer and restart if wrong
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    console.log("wrong");
    startOver();

  }
}




function nextSequence() {
  level++;
  $("h1").html("Level " + level);
  //generating random number b/w 0 to 3
  randomNumber = Math.floor(Math.random() * 4);

  //giving random colors in randomChosenColour variable from randomNumber variable
  randomChosenColour = buttonColors[randomNumber];

  //adding random colors to array gamePattern
  gamePattern.push(randomChosenColour);

  //selct button with same ID as randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  //save button color in userChosenColor (clicked btn)
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {
 buttonColors = ["red", "blue", "green", "yellow"];
 gamePattern = [];
 userClickedPattern = [];
 level = 0;
 started = false;
}
