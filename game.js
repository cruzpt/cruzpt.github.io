//array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array called gamePattern
var gamePattern = [];

// userClickedPattern
var userClickedPattern = [];

//has game started?
var started = false;
//game level
var level = 0;



//$(".btnmob").hide();
$(".btnmob").css("display", "none");

//$("#id").css("display", "block");

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  console.log("is mobile");
  //$("#level-title").hide();
  //$(".btnmob").show();

  $("#level-title").text("On mobile devices click button to start")
  $(".btnmob").css("display", "block");

  $(".btnmob").click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});







//detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  //contents of the variable userChosenColour
  userClickedPattern.push(userChosenColour);
  animate(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("wrong");
    playSound("wrong");
    playSound("wrong2");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      $("#level-title").text("Trump Over, click button to restart");
    } else{
      $("#level-title").text("Trump Over, press any Key to Restart the Game");
    }

    startOver();

  };
}
//generate a new random number between 0 and 3, and store it in a variable called randomNumber
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#title").addClass("hidden");
  $("#welcome").addClass("hidden");
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //select a random colour from the buttonColours array
  var randomChosenColour = buttonColours[randomNumber];
  //randomChosenColour generated in step 4 to the end of the gamePattern
  gamePattern.push(randomChosenColour);
  //animate a flash to the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play the sound for the button colour selected
  playSound(randomChosenColour);
}

function playSound(name) {
  //play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animate(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#title").removeClass("hidden");
  $("#welcome").removeClass("hidden");

};
