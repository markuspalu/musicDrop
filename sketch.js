let floor, ball;
let floorArr = [];
let floorAdded = false;
let collisionCounter = 0;
let counter = 0;
let wallL, wallR, wallT;
let floors;
let cameraZoom = 1;

function setup() {
	new Canvas(500, 500);

  wallL = new Sprite()
  wallL.width = 2;
  wallL.height = 250;
  wallL.x = 225;
  wallL.y = -100;
  wallL.collider = "static"; 
  wallL.color = "black"

  wallR = new Sprite()
  wallR.width = 2;
  wallR.height = 250;
  wallR.x = 275;
  wallR.y = -100;
  wallR.collider = "static"; 
  wallR.color = "black"

	world.gravity.y = 5;
  ball = new Sprite();
  ball.draw = () => {
    fill("lightblue");
    push();
		rotate(ball.direction);
		ellipse(0, 0, 20 + ball.speed, 20 - ball.speed);
		pop();
  }
  ball.d = 20;
  ball.x = 250;
  ball.y = 0;
  ball.bounciness = 0.5;

  floors = new Group();
}


let pressX;
let pressY;
let relX;
let relY;
let pressed = false;
let released = false;


function draw() {
	clear()
  background(200)

  if (floors.collides(ball)) {
    let synth = new p5.MonoSynth();
    let note = (["C3", "E3", "G3", "D3", "C3", "A3", "B2", "C2", "E3", "A2", "G2", "C4"]);
    synth.play(note[counter], 0.5);
    counter++;
    if (counter === note.length) {
      counter = 0;
    }
  }

  if (ball.y > height || kb.presses('R')) {
    ball.x = 250;
    ball.y = 0;
    ball.velocity.y = 0;
    ball.velocity.x = 0;
    counter = 0;
  }

  if (kb.pressing("SPACEBAR")) {
    camera.x = ball.x;
    camera.y = ball.y;
    cameraZoom = 2;
  } else {
    cameraZoom = 1;
    camera.x = 250;
    camera.y = 250;
  }

  camera.zoom = cameraZoom;

  if (mouse.presses()) {
    pressX = mouse.x;
    pressY = mouse.y;
    pressed = true;
    released = false;
  }

  if (mouse.released()) {
    relX = mouse.x;
    relY = mouse.y;
    released = true;
  }
  
  if (pressed === true && released === true && pressX !== relX && pressY !== relY) {
    floor = new floors.Sprite([[pressX, pressY], [relX, relY]]);
    floor.color = "brown"
    floor.collider = "static";
    pressed = false;
    released = false;
  }
}

// button to "blow air from bottom" which reverses the gravity