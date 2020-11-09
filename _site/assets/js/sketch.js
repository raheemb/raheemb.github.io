let canvas;
let frame = 0; // frame counter
let nPendulums = 8; // set the number of pendulums
let pendulums; // array of lower pendulums
let pendulumsInv; // array of upper pendulums


function setup() { 
  canvas = createCanvas(windowWidth, windowHeight); 
  canvas.position(0,0);
  canvas.style('z-index','-1');
  
  frameRate(30);

  pendulums = new Array(nPendulums);
  pendulumsInv = new Array(nPendulums);

  // set initial conditions of pendulum array
  let anchor = new p5.Vector(0,0);
  let theta = PI/2;
  let aVel = 0;
  let radBob = 20;
  
  // set color palette
  let c1 = color(254, 218, 106, 255);
  let c2 = color(9, 188, 138, 255);
  
  // create
  for (let i=0; i < nPendulums; i++) {
    // evenly space out pendulums from the edge to the center
    let len = map(i, 0, nPendulums-1, 180, 20);
    
    // determine the length of the trail based on the length of the pendulum arm
    let bufferLen = round(map(i, 0, nPendulums-1, 100, 20));
    
    // set color of pendulum based on length
    let lerpFactor = map(i, 0, nPendulums-1, 0, 1);
    let cBob = lerpColor(c1, c2, lerpFactor);

    // initialize the downwards swinging and upwards swinging pendulums
    pendulums[i] = new Pendulum(anchor, len, theta, aVel, radBob, cBob, bufferLen, true);
    pendulumsInv[i] = new Pendulum(anchor, len, theta, aVel, radBob, cBob, bufferLen, false);
  }
}


function draw() {  
  translate(width/2, height/2); // translate to center the sketch in the frame
  rotate(-PI/2);
  background(0); // clear the canvas each frame 
  
  // Iterate through all pendulums and update their positions
  pendulums.forEach(p => p.update());
  pendulumsInv.forEach(p => p.update());
}  


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}