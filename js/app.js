var rightEdge = 505;
var leftEdge = 0;
var bottomEdge = 404;
var tileWidth = 101;
var tileHeight = 83;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    // ensure enemies are not too slow
    this.speed = Math.floor(Math.random() * (250 - 100)) + 100;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < rightEdge) {
        this.x += dt * this.speed;
    } else {
        // enemy will spawn on one of the 3 tiles at random tile
        this.x = 0;
        var tiles = [40, 130, 210];
        var randomTile = tiles[Math.floor(Math.random() * tiles.length)]
        this.y = randomTile;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player constructor class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // new x and y value depending on what key is pressed
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
};

Player.prototype.scoreCalc = function() {
    ctx.font = "20px Arial";
    ctx.fillText('score:' + ' ' + this.score, 410, 80);
};

function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + tileWidth &&
            allEnemies[i].x + tileWidth > player.x &&
            allEnemies[i].y < player.y &&
            tileHeight + allEnemies[i].y > player.y) {
            player.reset();
            // score cannot drop below 0.
            while (player.score > 0) {
              player.score--;
            }
        }
    }
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - tileWidth < leftEdge) {
                this.x = leftEdge;
            } else {
                this.x -= tileWidth;
            }
            break;
        case 'up':
            // if the player reaches the water return him to starting tile.
            if (this.y < tileHeight) {
                player.reset();
                // increase his score by 1.
                this.score++;
            } else {
                this.y -= tileHeight;
            }
            break;
        case 'right':
            if (this.x + tileWidth >= rightEdge) {
                this.x = rightedge;
            } else {
                this.x += tileWidth;
            }
            break;
        case 'down':
            if (this.y + tileHeight > bottomEdge) {
                this.y = bottomEdge;
            } else {
                this.y += tileHeight;
            }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var player = new Player(202, 404);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 40), new Enemy(0, 130), new Enemy(0, 210)];

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
