/**
 * This class represents an instance of Langton's Ant
 * (https://en.wikipedia.org/wiki/Langton%27s_ant).
 *
 * Use the code as you please. Comments and corrections should be sent
 * to mail@jonaslindstrom.dk. Enjoy!
 */
function Langton(canvas, w, h, d) {
    this.d = d;
    this.w = w;
    this.h = h;

    // Current position and direction of the ant
    this.i = Math.round(w / 2);
    this.j = Math.round(h / 2);
    this.direction = 0; //0: right, 1: down, 2: left, 3: up

    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.aliveColor = "#000000";
    this.deadColor = "#FFFFFF";
    this.antColor = "#FF0000"
};

/**
 * Setup the game.
 */
Langton.prototype.setup = function() {
    this.cells = new Array(this.w);
    for (var i = 0; i < this.w; i++)
	this.cells[i] = new Array(this.h);
    
    for (var i = 0; i < this.w; i++)
	for (var j = 0; j < this.h; j++)
	    this.cells[i][j] = 0;

    this.frame = 0;
};

/**
 * Toggle the animation running/not running.
 */
Langton.prototype.pause = function() {
    this.running = !this.running;
    if (this.running)
	this.run();
};

/**
 * Start the game already!
 */
Langton.prototype.start = function() {
    this.setup();
    this.running = true;
    this.run();
};

/**
 * Run one more step in the loop, draw stuff and wait. Then run again.
 */
Langton.prototype.run = function() {
    this.step();

    var self = this;
    var wait = function() {
	if (self.running)
	    self.run();
    };
    window.setTimeout(wait, 1000/50);
};

/**
 * Determine whether each cell should be dead or alive in next step,
 * and perform the changes.
 */
Langton.prototype.step = function() {
    if (this.cells[this.i][this.j])
	this.direction++;
    else
	this.direction--;
    this.direction = (this.direction + 4) % 4

    this.flip(this.i, this.j);
    this.move();
    
    this.frame++;
    this.drawInfo();
};

Langton.prototype.drawInfo = function() {
    this.ctx.fillStyle = "#AAAAAA";
    this.ctx.fillRect(10, 10, 100, 19);
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px Helvetica";
    this.ctx.fillText("Frame: " + this.frame, 15, 24);
};

/**
 * Flip the color of cell (i,j)
 */
Langton.prototype.flip = function(i,j) {
    this.cells[i][j] = (this.cells[i][j] + 1) % 2;
    this.drawCell(i,j);
};

/**
 * Move the ant in it's current direction.
 */
Langton.prototype.move = function() {
    switch (this.direction) {
	case 0: //Right
	this.i++;
	break;
	case 1: //Down
	this.j++;
	break;
	case 2: //Left
	this.i--;
	break;
	case 3: //Up
	this.j--;
	break;
    }
    this.drawAnt();
};

/**
 * Draw cell (i,j).
 */
Langton.prototype.drawCell = function(i,j) {
    this.ctx.fillStyle = this.cells[i][j] ? this.aliveColor : this.deadColor;
    this.ctx.fillRect(i*this.d, j*this.d, this.d, this.d);
};

/**
 * Draw the ant at its current position.
 */
Langton.prototype.drawAnt = function() {
    this.ctx.fillStyle = this.antColor;
    this.ctx.fillRect(this.i*this.d, this.j*this.d, this.d, this.d);
};
