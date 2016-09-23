var RIGHT_EDGE = 505;
var RIGHT_MOST_TILE = 404;
var LEFT_EDGE = 0;
var BOTTOM_EDGE = 404;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

// Create a superclass with shared properties and methods.
var Character = function(x, y, spriteURL) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + spriteURL;
};

// Method shared by both the enemies and the player.
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    var spriteURL = 'enemy-bug.png';
    // Instantiate the Character function and set its 'this' value.
    Character.call(this, x, y, spriteURL);
    // ensure enemies are not too slow
    this.speed = Math.floor(Math.random() * (250 - 100)) + 100;
};

Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
    if (this.x < RIGHT_EDGE) {
        this.x += dt * this.speed;
    } else {
        // Enemy will spawn on one of the 3 tiles at random.
        this.x = 0;
        var tiles = [40, 130, 210];
        var randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        this.y = randomTile;
    }
};

// Player constructor class.
var Player = function(x, y) {
    var spriteURL = 'char-boy.png';
    Character.call(this, x, y, spriteURL);
    this.score = 0;
};

Player.prototype = Object.create(Character.prototype);

/*Player.prototype.update = function(dt) {
};*/

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
};

Player.prototype.scoreCalc = function() {
    ctx.font = "20px Arial";
    ctx.fillText('score:' + ' ' + this.score, 410, 80);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - TILE_WIDTH < LEFT_EDGE) {
                this.x = LEFT_EDGE;
            } else {
                this.x -= TILE_WIDTH;
            }
            break;
        case 'up':
            // If the player reaches the water return him to starting tile.
            if (this.y < TILE_HEIGHT) {
                this.reset();
                // Increase players score by 1.
                this.score++;
            } else {
                this.y -= TILE_HEIGHT;
            }
            break;
        case 'right':
            if (this.x + TILE_WIDTH >= RIGHT_EDGE) {
                this.x = RIGHT_MOST_TILE;
            } else {
                this.x += TILE_WIDTH;
            }
            break;
        case 'down':
            if (this.y + TILE_HEIGHT > BOTTOM_EDGE) {
                this.y = BOTTOM_EDGE;
            } else {
                this.y += TILE_HEIGHT;
            }
    }

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
