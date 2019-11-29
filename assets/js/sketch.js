// Adapted from Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

var canvas;
let stars = [];
let speed = 5;
let ex = 0;
let ey = 0;
let easing = 0.05;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  background(255);
  noStroke();
  for (let i = 0; i < 400; i++) {
    stars[i] = new Star();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }

  let targetX = mouseX;
  let dx = targetX - ex;
  ex += dx * easing;

  let targetY = mouseY;
  let dy = targetY - ey;
  ey += dy * easing;

  fill(237, 34, 93);
  translate(-width/2, -height/2)
  ellipse(ex, ey, 24, 24);

}
