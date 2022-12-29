var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;

$(document).on("keypress",function(){
    if(level===0){
        $("level-title").text("Level "+level);
        nextSequence();
    }
        
});
$(".btn").on("click",function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    music(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(currentLevel===gamePattern.length-1){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
}
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    music(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern=[];
}
function animatePress(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
        $("#"+key).removeClass("pressed");
    },100);
}
function music(key){
    switch (key) {
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;    
        default:
            break;
    }
}