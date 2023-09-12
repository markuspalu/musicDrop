let floor, ball, balls, ball1, ball2, ball3, ball4;
let floorArr = [];
let floorAdded = false;
let collisionCounter = 0;
let counter = 0;
let wallTB, wallLR;
let wallB;
let wallL1, wallR1;
let wallL2, wallR2;
let wallL3, wallR3;
let wallL4, wallR4;
let wallLeft, wallRight;

let floors;
let cameraZoom = 1;

let yGravity = 5;


function setup() {
	new Canvas(500, 500);

  wallLeft = new Sprite()
  wallLeft.width = 2;
  wallLeft.height = 1000;
  wallLeft.x = 0;
  wallLeft.y = 0;
  wallLeft.collider = "static"; 
  wallLeft.color = "black"
  wallRight = new Sprite()
  wallRight.width = 2;
  wallRight.height = 1000;
  wallRight.x = 500;
  wallRight.y = 0;
  wallRight.collider = "static"; 
  wallRight.color = "black"

  wallTB = new Sprite()
  wallTB.width = 2;
  wallTB.height = 1000;
  wallTB.x = 250;
  wallTB.y = 0;
  wallTB.collider = "static"; 
  wallTB.color = "black"

  wallLR = new Sprite()
  wallLR.width = 1000;
  wallLR.height = 2;
  wallLR.x = 0;
  wallLR.y = 250;
  wallLR.collider = "static"; 
  wallLR.color = "black"

  wallB = new Sprite()
  wallB.width = 1000;
  wallB.height = 2;
  wallB.x = 0;
  wallB.y = 500;
  wallB.collider = "static"; 
  wallB.color = "black"

  wallL1 = new Sprite()
  wallL1.width = 2;
  wallL1.height = 250;
  wallL1.x = 355;
  wallL1.y = -100;
  wallL1.collider = "static"; 
  wallL1.color = "black"
  wallR1 = new Sprite()
  wallR1.width = 2;
  wallR1.height = 250;
  wallR1.x = 395;
  wallR1.y = -100;
  wallR1.collider = "static"; 
  wallR1.color = "black"

  wallL2 = new Sprite()
  wallL2.width = 2;
  wallL2.height = 250;
  wallL2.x = 105;
  wallL2.y = -100;
  wallL2.collider = "static"; 
  wallL2.color = "black"
  wallR2 = new Sprite()
  wallR2.width = 2;
  wallR2.height = 250;
  wallR2.x = 145;
  wallR2.y = -100;
  wallR2.collider = "static"; 
  wallR2.color = "black"

  wallL3 = new Sprite()
  wallL3.width = 2;
  wallL3.height = 30;
  wallL3.x = 355;
  wallL3.y = 265;
  wallL3.collider = "static"; 
  wallL3.color = "black"
  wallR3 = new Sprite()
  wallR3.width = 2;
  wallR3.height = 30;
  wallR3.x = 395;
  wallR3.y = 265;
  wallR3.collider = "static"; 
  wallR3.color = "black"

  wallL4 = new Sprite()
  wallL4.width = 2;
  wallL4.height = 30;
  wallL4.x = 105;
  wallL4.y = 265;
  wallL4.collider = "static"; 
  wallL4.color = "black"
  wallR4 = new Sprite()
  wallR4.width = 2;
  wallR4.height = 30;
  wallR4.x = 145;
  wallR4.y = 265;
  wallR4.collider = "static"; 
  wallR4.color = "black"

  balls = new Group(); 

  ball1 = new balls.Sprite();
  ball2 = new balls.Sprite();
  ball3 = new balls.Sprite();
  ball4 = new balls.Sprite();


  balls.forEach(e => {
    e.draw = () => {
      e.color = "lightblue"
      push();
      rotate(e.direction);
      ellipse(0, 0, 20, 20);
      pop();
    }
  });

  balls.d = 20;
  balls.bounciness = 0.75;

  floors = new Group();
}

let pressX;
let pressY;
let relX;
let relY;
let pressed = false;
let released = false;


let allNotes = [
["C2", "E2", "G2"], 
["C3", "D3", "E3", "F3", "G3"], 
["C4", "C4", "G4", "E4", "D4", "C4"], 
["E5", "D5", "C5", "B4", "A4", "G4"]
]

let allCounters = [0, 0, 0, 0]
let synth = new p5.MonoSynth();

function draw() {
	clear()
  background(200)

	world.gravity.y = yGravity;


  for (let i = 0; i < balls.length; i++) {
    if (floors.collides(balls[i])) {
      balls[i].color = "red";
      synth.play(allNotes[i][allCounters[i]], 0.5, 0, 0.3);
      allCounters[i]++
      if (allCounters[i] === allNotes[i].length) {
        allCounters[i] = 0;
      }
    }
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].collides(wallB) || balls[i].collides(wallLR)) {
      if (i === 0) {
        balls[i].x = 125;
        balls[i].y = 15;
      } else if (i === 1) {
        balls[i].x = 375;
        balls[i].y = 15;
      } else if (i === 2) {
        balls[i].x = 125;
        balls[i].y = 265;
      } else if (i === 3) {
        balls[i].x = 375;
        balls[i].y = 265;
      }
      balls[i].velocity.x = 0;
      balls[i].velocity.y = 0;
      balls[i].speed = 0;
      allCounters[i] = 0;
    }
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
    floor.color = "red"
    floor.collider = "static";
    pressed = false;
    released = false;
  }
}

// button to "blow air from bottom" which reverses the gravity