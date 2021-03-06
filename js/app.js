// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/car.png';
    this.yRow = [60, 145, 225];
    this.x = -125;
    this.y = this.yRow[Math.floor(Math.random() * this.yRow.length)];
    this.speed = (Math.random() * (300 - 20)) + 100;
};

// Update the enemy's position while controling speed and direction
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -120;
        this.y = this.yRow[Math.floor(Math.random() * this.yRow.length)];
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};

//scoreboard
Player.prototype.scoreBoard = function() {
    ctx.font = '32pt sans';
    ctx.clearRect(0,0, 250,50);
    ctx.fillText("Score:" + this.score, 10, 35);
    ctx.clearRect(250,0, 250,50);
    ctx.fillText("Lives:" + lives, 300, 35);
};

//Resets Player position when reaches water
Player.prototype.update = function(dt) {
    if (this.y < -20) {
        this.reset();
        //this.score += 10;
    }

    this.checkCollisions();
    this.scoreBoard();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Takes keyboard inputs and controls player movment
Player.prototype.handleInput = function(key) {
    var xMove = 100;
    var yMove = 83;

    if(key === 'left' && this.x > 0) {
        this.x -= xMove;
    }
    else if(key === 'up' && this.y > 0) {
        this.y -= yMove;
    }
    else if(key === 'right' && this.x < 400) {
        this.x += xMove;
    }
    else if (key === 'down' && this.y < 400) {
        this.y += yMove;
    }
};

//Resets player to starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


var lives = 4;
var life = function() {
    if(lives == 0) {
        alert("Game Over");
        console.log("Game Over!");
        location.reload();

    }

};


///Adding a Princess to save
var Princess = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.y = -10;
    this.xCol = [0, 200, 400];
    this.x = this.xCol[Math.floor(Math.random() * this.xCol.length)];
};

Princess.prototype.update = function(dt) {

};

// Draw the Princess on the screen
Princess.prototype.render = function(td) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


///Adding Rocks
var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};

Rock.prototype.update = function(dt) {

};

// Draw the rocks
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(), new Enemy()];
var player = new Player(200,400);
var princess = new Princess();
var rocks = [new Rock(100, -20),new Rock(300, -20)];

//Check for collisions and adds score if player reaches princess
Player.prototype.checkCollisions = function(dt) {
    for(var i in allEnemies) {
        if(Math.abs(this.x - allEnemies[i].x) <= 60 && Math.abs(this.y - allEnemies[i].y) <= 40) {
            this.reset();
            lives =(lives -1);
            life();
            }
    }
    for(var j in rocks) {
        if(Math.abs(this.x - rocks[j].x) <= 60 && Math.abs(this.y - rocks[j].y) <= 40) {
            this.reset();
            }
    }
        if(Math.abs(this.x - princess.x) <= 60 && Math.abs(this.y - princess.y) <= 60) {
            this.score += 10;
            this.reset();
            princess = new Princess();
       }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});