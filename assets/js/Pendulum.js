// A class to create pendulum objects. Each pendulum takes an anchor position,
// an initial theta (relative to the vertical axis), an initial angular velocity, 
// the radius of the bob, the colors of the clet and bob, the length of the 
// fadeout buffer, and an inv parameter to set the direction of gravity. 
// When update is called on a pendulum, that pendulum's position is updated and
// then drawn to the canvas with a trail of previous positions.
class Pendulum { 
  
  constructor(anchor_, len_, theta_, aVel_, radBob_, cBob_, bufferLen_, inv_) {  
    this.anchor = new p5.Vector(anchor_.x, anchor_.y); // location of the anchor
    this.len = len_; // length of the string
    this.theta = theta_; // initial angular displacement
    this.pos = new p5.Vector(this.anchor.x+this.len*sin(this.theta), this.anchor.y+this.len*cos(this.theta)); // initial position of the bob
    this.aVel = aVel_; // initial angular velocity
    if (inv_) this.g = -0.1; // set direction of gravity based on inv_
    else this.g = 0.1;
    this.g *= 1.5;
    this.radBob = radBob_; // set the radius of the bob
    
    this.cBob = cBob_; // color of the bob
    
    this.bufferLen = bufferLen_; // length of the trails buffer
    this.fade = new Array(bufferLen_);
    this.buffer = [];
    // preload the trails buffer with the initial position of the bob and set the fade color for the trails
    for (let i=0; i < bufferLen_; i++) {
      this.buffer.push(this.pos);
      let lerpFactor = map(i, 0, bufferLen_-1, 0, 1);
      this.fade[i] = lerpColor(color(red(this.cBob), blue(this.cBob), green(this.cBob), 0), this.cBob, lerpFactor);
    }
  }
  
  update() { 
    // update the angular acceleration, velocity, theta, and position at each time step
    this.aAcc = this.g/this.len * sin(this.theta);
    this.aVel += this.aAcc; 
    this.theta += this.aVel;
    this.pos = new p5.Vector(this.anchor.x+this.len*sin(this.theta), this.anchor.y+this.len*cos(this.theta));
    
    // add the updated position to the buffer queue and remove the last
    this.buffer.push(this.pos);
    this.buffer.shift();
    
    // draw a gradient line from the position to the anchor
    gradientLine(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y, color(0), this.cBob);
    
    // draw the trails using the buffer queue with colors taken from the fade array
    let i = 0;
    this.buffer.forEach(pos => {
      noStroke(); fill(this.fade[i]); 
      ellipse(pos.x, pos.y, this.radBob, this.radBob);
      i++;
    });
  } 
}

// Draw a line from p1 to p2 that changes color from a to b
function gradientLine(x1, y1, x2, y2, a, b) {
  let deltaX = x2-x1;
  let deltaY = y2-y1;
  let tStep = 1.0/dist(x1, y1, x2, y2);
  for (let t = 0.0; t < 1.0; t += tStep) {
    fill(lerpColor(a, b, t));
    ellipse(x1+t*deltaX,  y1+t*deltaY, 2, 2);
  }
}