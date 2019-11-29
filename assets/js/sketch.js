var canvas;
let grow = 0;
let sign = 1;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(255);
  fill(67,204,203); 
  noStroke();
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  sign = -sign;
}

function draw() {
  background(255); 
  ellipse(mouseX, mouseY, grow);
  grow = grow + sign;
  if (grow > 50 || grow < -100) {
    sign = -sign;
  }
}

