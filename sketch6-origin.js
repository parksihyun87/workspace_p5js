// 무작위 원형 그리기

// var song

// var points = []
// var mult = 0.005

// var r1
// var r2
// var g1
// var g2
// var b1
// var b2


// // function preload(){//동일 폴더 저장 파일
// //     song=loadSound('./assets/music/Recollections.mp3')//노래 파일||경로 삽입
// // }

// function setup(){
//     createCanvas(windowWidth,windowHeight)
//     background(30)
//     angleMode(DEGREES)
//     noiseDetail(1)

//     var density = 30
//     //뻑뻑함
//     var space = width / density

//     for(var x= 0; x < width; x +=space){
//         for(var y=0; y < height; y +=space){
//             var p=createVector(x + random(-10, 10) , y + random(-10, 10))
//             points.push(p)
//         }
//     }

//     shuffle(points, true)

//     r1 = random(255)
//     r2 = random(255)
//     g1 = random(255)
//     g2 = random(255)
//     b1 = random(255)
//     b2 = random(255)

//     mult = random(0.002, 0.01)

// }


// function draw(){
//     noStroke()

//     if(frameCount * 5 <= points.length){
//         var max = frameCount * 5
//     } else {
//         var max =points.length
//     }

//     for (var i = 0; i < max; i++){

//         var r=map(points[i].x, 0, width, r1, r2)
//         var g=map(points[i].y, 0, width, g1, g2)
//         var b=map(points[i].x, 0, width, b1, b2)
//         var alpha = map(dist(width / 2, height / 2, points[i].x, points[i].y), 0, 350, 400, 0 )

//         fill(r, g, b, alpha)

//         var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720)

//         points[i].add(createVector(cos(angle),sin(angle)))

//         if(dist(width/ 2, height/ 2, points[i].x, points[i].y) < 350) {
//             ellipse(points[i].x, points[i].y, 1)
//         }
//     }
// }

// function mouseClicked(fxn){
//     if(song.isPlaying()){
//       song.pause()
//       noLoop()
//     }else{
//       song.play()
//       loop()
//     }
// }
let flock;

function setup() {
  createCanvas(windowWidth,windowHeight);
  createP("Drag the mouse to generate new boids.");

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2, height / 2); // 색상 생략
    flock.addBoid(b);
  }
}

function draw() {
  background(0);
  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  let brightColor = color(random(200, 255), random(50, 255), random(50, 255));
  flock.addBoid(new Boid(mouseX, mouseY, brightColor));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y, col) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;
  this.maxforce = 0.05;

  // 색상이 주어지면 사용, 아니면 기본 회색
  this.color = col || color(127, 127, 127);
}


Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  let theta = this.velocity.heading() + radians(90);
  fill(this.color); // 무작위 색상 사용
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
