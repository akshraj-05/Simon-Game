

var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var userclickedpattern = [];

var started = false;

var level = 0;


//for ditecting key press 
$(document).keypress(function () {

    //if note started than start it
    if (!started) {
        nextSequence();
        started = true;
    }

});

//what the pattern is
function nextSequence() {

    level++;

    $("#level-title").text("Level " + level);
    var randomNumber;
    randomNumber = (Math.floor(4 * Math.random()));


    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);



    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSouns(randomChosenColour);
}



//what user selected
$(".btn").click(function () {
    var userChoosencolor = $(this).attr("id");

    userclickedpattern.push(userChoosencolor);


    makeSouns(userChoosencolor);
    makeAnimation(userChoosencolor);


    //after user selected answer we should chack that wether it is true or false
    checkAnswer(userclickedpattern.length - 1);

});



//checking the answer

function checkAnswer(lengthofselcted) {


    //checking if last elemetn os same
    if (gamePattern[lengthofselcted] === userclickedpattern[lengthofselcted]) {
        console.log("Success");

        //checking if length of selcted element are same
        if (gamePattern.length == userclickedpattern.length) {
            console.log("Success");
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        console.log("wrong");
        //play the sound wrong
        makeSouns("wrong");

        //adding the class named game over to the body who changes backgrounf color as red when the answer will bw wrong
        $("body").addClass("game-over");

        //remove that class after 200ms
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //changing the header section
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //so the answer is wrong so that we havve to start over over from biginning
        startOver();

    }

}


//if the answer is wrong than start over the game from beginnnig

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];

}

//managing sounds

function makeSouns(word) {
    var audio = new Audio("sounds/" + word + ".mp3");
    audio.play();

}

//making animation when user click

function makeAnimation(word) {

    $("#" + word).addClass("pressed");
    setTimeout(function () {
        $("#" + word).removeClass("pressed");
    }, 100);
}