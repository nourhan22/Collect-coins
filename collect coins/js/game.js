// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var btn;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// man image
var manReady = false;
var manImage = new Image();
manImage.onload = function () {
	manReady = true;
};
manImage.src = "images/man.png";

// coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
	coinReady = true;
};
coinImage.src = "images/coin.png";

// Game objects
var man = {
	speed: 150// movement in pixels per second
};
var coin = {};
var coinsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);



// Reset the game when the player catches a coin
var reset = function () {
	man.x = canvas.width / 2;
	man.y = canvas.height / 2;

	// Throw the coin somewhere on the screen randomly
	coin.x = 32 + (Math.random() * (canvas.width - 64));
	coin.y = 32 + (Math.random() * (canvas.height - 64));
};

      


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		manImage.src = "images/man4.png";
		man.y -= man.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		manImage.src = "images/man3.png";
		man.y += man.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		manImage.src = "images/man2.png";
		man.x -= man.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		manImage.src = "images/man.png";
		man.x += man.speed * modifier;
	}

	// Are they touching?
	if (
		man.x <= (coin.x + 32)
		&& coin.x <= (man.x + 32)
		&& man.y <= (coin.y + 32)
		&& coin.y <= (man.y + 32)
	) {
		++coinsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (manReady) {
		ctx.drawImage(manImage, man.x, man.y);
	}

	if (coinReady) {
		ctx.drawImage(coinImage, coin.x, coin.y);
	}

	// Score
	ctx.fillStyle = "rgb(255, 235, 59)";
	ctx.font = "26px fantasy";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Coins caught: " + coinsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	
	requestAnimationFrame(main);
};


var time = Date.now();
var running = setInterval(main, 10); 

setTimeout(function() {       
  clearInterval(running); 
       
       if(coinsCaught<=8)
  {alert('Game over!\n hard luck your coins is ' +coinsCaught+'try again if you want ');}
  else  
  {
  	alert('Good job\n  your coins is ' +coinsCaught+'try again if you want ');
  }
    /* btn = document.createElement("BUTTON");
    var t = document.createTextNode("Play Again");
    btn.appendChild(t);
    document.body.appendChild(btn);*/


}, 60000); 
function playag()
{
	reset();
	main();
}
 
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var then = Date.now();
reset();
main();

