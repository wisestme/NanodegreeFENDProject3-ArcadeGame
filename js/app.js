// Globals section
let playerList = document.querySelectorAll('.player');
const playerListArray = Array.from(playerList);
const startButton = document.querySelector('#start');
const modal1 = document.querySelector('.modal1');
let finishLine = 0;
let score = document.getElementById('score');
let finalScore = document.getElementById('final-score');
let lives = 5;
let livesDisplay = document.getElementById('lives');
let mins = document.querySelector('span.minutes');
let secs = document.querySelector('span.seconds');
let currentTimer = 0;
let incrementer;
const subMinutes = document.querySelector('.sub-minutes');
const subSeconds = document.querySelector('.sub-seconds');
const elapsedTime = document.querySelector('.time');
let sprite;
const endModal = document.querySelector('#end-modal-container');
const playAgainYes = document.querySelector('.play-again-yes');
const dashBoard = document.querySelector('.dashboard')


// player selection
function chosenPlayer(){
    if(playerListArray[0].classList.contains('chosen') === true){
        sprite = 'images/char-princess-girl.png';
    } else if (playerListArray[1].classList.contains('chosen') === true){
        sprite = 'images/char-cat-girl.png';
    } else if (playerListArray[2].classList.contains('chosen') === true){
        sprite = 'images/char-boy.png';
    } else if (playerListArray[3].classList.contains('chosen') === true){
        sprite = 'images/char-horn-girl.png';
    } else if (playerListArray[4].classList.contains('chosen') === true){
        sprite = 'images/char-pink-girl.png';
    }
};

// assign the event listeners to a variable for easy enabling
// and disabling of the event listeners for the keyboard input
let keysListener =function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// Obstacles our player must avoid
class Enemy {
    constructor(x, y,) {
    // Variables applied to each of our instances go here,
    // one provided to get started

    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images
    this.bugs = 'images/enemy-bug.png';
    this.x = x; //enemy starts off the game board
    this.y = y;    //vertically align enemy 
    this.run = Math.random() * 100; //set random speed for the obstacles.
}
}
    
// Event listeners 

// To highlight the chosen player
for(let i = 0; i < playerListArray.length; i++) {
    playerListArray[i].addEventListener('click', function() {
        for(let i = 0; i < playerListArray.length; i++){
        playerListArray[i].classList.remove('chosen');
        }
        playerListArray[i].classList.add('chosen');
    });
}

// To close first modal
startButton.addEventListener('click', function(){
    closeModal1();
    latest();
    showDashboard();
});

// Agree to play again
playAgainYes.addEventListener('click', reset);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

   
    // condition for enemy run
    if(this.x < 510) {

        // enemy run multiplied by dt for uniformity on all computers
        // increase speed wrt score
        this.x += this.run * dt;
        if(finishLine > 2 && finishLine <= 4) {
        	this.x += (this.run * 2) * dt;
            } else if (finishLine > 4 && finishLine <= 6) {
            		this.x += (this.run * 4) * dt;
            } else if (finishLine > 6 && finishLine <= 8) {
            		this.x += (this.run * 6) * dt;
            } else if (finishLine > 8 && finishLine <= 10) {
            		this.x += (this.run * 8) * dt;
            } else if (finishLine>9) {
            		this.x += (this.run * 10) * dt;
            }
        } else {
                // loop enemy run
                this.x = -100;
            }  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.bugs), this.x, this.y);
};


// Write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Star {
    constructor() {
        this.sprite = sprite;
        this.x = 0;
        this.y = 0;
        // set starting position for our Star player
        this.initialX = 200;
        this.initialY = 400;
        this.x = this.initialX;
        this.y = this.initialY;
        this.success = false;
    }
    /* Draw our Star player on the x and y positions using the same render method
        given in the starter code for the Enemy
    */
    render() {
        ctx.drawImage(Resources.get(sprite), this.x, this.y);
    }

handleInput(dt){
    switch (dt) {
        case 'right':
            if(this.x < 400) {  // sets righthand boundary.
               this.x += 101;  // 101 is suitable for horizontal movement according
        }                  //to the col value in the drawImage method in the engine.js file
            break;
        case 'left':
         if(this.x > 0) {      // sets lefthand boundary.
            this.x -= 101;
        }
            break;
        case 'up':
        if(this.y > 0){     //sets boundary against upward movement
            this.y -= 83;   // 83 is suitable for horizontal movement according
        }                   //to the row value in the drawImage method in the engine.js file
            break;
        case 'down':
        if(this.y < 400) { //sets boundary against downward movement.
            this.y += 83;
        }
    }
    
}

// collission detection
update() {
    for(let enemy of allEnemies) {  
        // i slowed down the speed of the obstacles to determine
        // the horizontal conditions for collision and i used the
        // dev tool to view and set the vertical condition for collission
        if(((this.y - 4) === enemy.y) && (((enemy.x+80) > this.x) && ((enemy.x-80) < this.x) )){
            this.resetStarPosition();
            lives--;
            livesDisplay.innerHTML = lives; 
        }
    }
    // Win condition
    if(this.y < 68) {
        console.log('success!!!');
        this.success = true;
        finishLine++;
        score.innerHTML = finishLine;
        this.resetStarPosition();
    }
    chosenPlayer();
    gameOver();
}
resetStarPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
}
}
// Objects instantiation
// Place all enemy objects in an array called allEnemies
const obstacle1 = new Enemy(Math.random() * -301, 64);
const obstacle2 = new Enemy(Math.random() * -101, 147,);
const obstacle3 = new Enemy(Math.random() * -201, 230,);
const obstacle4 = new Enemy(Math.random() * -101, 230,);
const obstacle5 = new Enemy(Math.random() * -201, 147,);
const allEnemies = [];
allEnemies.push(obstacle1, obstacle2, obstacle3, obstacle4, obstacle5);

// Place the player object in a variable called player
const player = new Star();

// close the first modal
function closeModal1() {
    modal1.style.display = 'none';
    // enable the listener for the keyboard input
    document.addEventListener('keyup', keysListener, true);
}

// timer function
function latest() {
    incrementer = setInterval(function() {
        currentTimer += 1;
        //convert current time to hr,min,sec
        calculateTime(currentTimer);
        mins.innerHTML = minutes;
        secs.innerHTML = seconds;
    }, 1000)    
}

// stop watch
function calculateTime() {
    minutes = (Math.floor((currentTimer/60)%60)).toPrecision(2);
    seconds = (currentTimer%60).toPrecision(2);
    msec = (currentTimer*10).toPrecision(2);
}

// Game over function
function gameOver() {
	if(lives === 0) {
		//console.log('game over');
		launchEndModal();
		stopTimer();
		finalScore.innerHTML = finishLine;
        document.removeEventListener('keyup', keysListener, true);
	}
}

// Reset function
function reset() {
    window.location.reload();
}

// Show End Modal
function launchEndModal() {
	endModal.style.display = 'block';
}

// Stop Timer
function stopTimer() {
    clearInterval(incrementer);
}

// show dashboard.
function showDashboard() {
    dashBoard.style.display = 'block';
}