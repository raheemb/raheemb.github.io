// Adapted from Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

function Star() {
  maxyx = max(width,height);
  this.r = random(-maxyx, maxyx);
  this.d = random(-PI, PI)
  this.z = random(maxyx);
  this.pz = this.z;

  this.update = function() {
    this.z = this.z - speed;
    this.d = this.d + speed*(PI/1000);
    if (this.d > PI) {
      this.d = -PI;
    } 
    if (this.z < 1) {
      this.r = random(-maxyx, maxyx);
      this.d = random(-PI, PI)
      this.z = maxyx;
      this.pz = this.z;
    }
  }

  this.show = function() {
    fill(220,245,245); 
    noStroke();

    var sr = map(this.r / this.z, 0, 1, 0, width);

    var re = map(this.z, 0, width, 16, 0);
    ellipse(sr*cos(this.d), sr*sin(this.d), re, re);

    var pr = map(this.r / this.pz, 0, 1, 0, width);

    this.pz = this.z;

    stroke(220,245,245);
    line(pr*cos(this.d), pr*sin(this.d), sr*cos(this.d), sr*sin(this.d));

  }
}