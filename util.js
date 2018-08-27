function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
function pointAtAngle(x,y,angle,distance) {
    return {x:x+distance*Math.cos(angle),y:y+distance*Math.sin(angle)};
};
function angleOfPointABFromXY(a,b,x,y) {
    return Math.atan2(b-y,a-x);
};
function distanceFromABToXY(a,b,x,y) {
    var distanceX = x-a;
    var distanceY = y-b;
    return Math.round( Math.sqrt( (distanceX*distanceX)+(distanceY*distanceY) ));
}
degToRad = function(radians) {
    return radians*(Math.PI/180);
};
radToDeg = function(radians) {
    deg = radians*(180/Math.PI);
    if (deg < 0) {
        deg += 360;
    } else if (deg > 359) {
        deg -= 360;
    };
    return radians*(180/Math.PI);
};
function fullscreen() {
	// fullscreen = true
    var el = document.body
    if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else {
        el.mozRequestFullScreen()
    }
}
function exitFullscreen() {
	// fullscreen = false
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
};
function playSound(sound) {
	if (soundOn) {
		sound.play()
	}
}
function scoreInFeet(score) {
	return Math.round((score/(frog.sprite.height/3)))
}
function getScoresFromDatabase(gameName,populate,display) {
    console.log("CALLING FOR SCORES!!")
    $.ajax({ type: "get",   
        url: "http://www.eggborne.com/scripts/getscores.php",
        data: {game:gameName},
        
        success : function(text)
        {
            // console.log( "text" + text)
            scoreArray.length = 0
            pairArray = text.split(" - ")
            for (item in pairArray) {  
                var scoreEntry = pairArray[item].split(" ")
                var literalName = scoreEntry[0]
                if (scoreEntry.length > 2) {
                    var fixedEntry = []
                    fixedEntry[1] = scoreEntry.pop()
                    fixedEntry[0] = scoreEntry.join(" ")
                    scoreArray.push(fixedEntry)
                } else if (scoreEntry.length === 2) {
                    scoreArray.push(scoreEntry)
                }
            }
            if (!populate) {
                
                return scoreArray
            } else {
                updateScoreboard()
                if (display) {
                    highScoreScreen.container.visible = true
                }
            }
        },
        error: function(){
            console.log('Could not connect to get!');
            scoreArray = [["void",1212]]
        }
    });

}
function saveScoreToDatabase(gameName,playerName,playerScore) {
    
    $.ajax({ type: "post",   
        url: "http://www.eggborne.com/scripts/savescores.php", 
        data: {game:gameName,name:playerName,score:playerScore},
        success : function(data)
        {
            getScoresFromDatabase(gameName,true,true)
        },
        error: function(){
            console.log('Could not connect to post!')
        }
    });

}
function getTotalKillsFromDatabase(gameName) {
    $.ajax({ type: "get",   
        url: "http://www.eggborne.com/scripts/getdeadfrogs.php",
        data: {game:gameName},
        
        success : function(text)
        {
            if (text.length < 20) {
                titleScreen.killCount.text = "total frogs killed: " + text
            } else {
                titleScreen.killCount.text = "total frogs killed: unavailable"
            }
            
        },
        error: function(){
            console.log('Could not connect to get kills!');
        }
    });

}
function sendDeadFrogToDatabase(gameName) {
    $.ajax({ type: "post",   
        url: "http://www.eggborne.com/scripts/senddeadfrog.php",
        data: {game:gameName},
        success : function(data)
        {
            // console.log(data)
        
        },
        error: function(){
            console.log('Could not connect to add a dead frog!');
        }
    });
}

