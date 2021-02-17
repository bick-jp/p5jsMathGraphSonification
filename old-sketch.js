class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawPoint() {
    fill(0);
    strokeWeight(10);
    point(this.x, this.y);
  }

  printCoordinates() {
    print('(' + this.x + ', ' + -(this.y) + ')')
  }
}

const width = 500;
const height = 500;
const gridSize = 25;

let osc, freq, amp; // for oscillator

let pitches = [];
let points = []; //Array to put Point class

var playButton;
var stopButton;

function setup() {
  createCanvas(width,height);
  noLoop();
  frameRate(60);

  playButton = createButton("Play");
  playButton.mousePressed(startLoop);

  playButton = createButton("Stop");
  playButton.mousePressed(stopLoop);

  background(200);
  drawGrid();

  osc = new p5.Oscillator('sine');
  osc.amp(0);

  removableDiscontinuity();
  //linear();
  //quadratic();
}

let temp = 0;
function draw() {
  background(200);
  drawGrid();

  translate(width/2, height/2); // Why do I need translate here?
  drawEquation();

  pitch = map(-points[temp].y, -250, 250, 220, 440);
  osc.freq(pitch);

  // removal point
  fill(255);
  ellipse(0, -(1.5)*gridSize, 10, 10);

  // moving point
  fill(0);
  ellipse(points[temp].x, points[temp].y, 10, 10);


  if (temp < points.length-1) {
    temp = temp + 1;
    if (temp > 245 && temp < 255) {
      osc.amp(0);
    } else {
      osc.amp(0.5);
    }
  } else {
    stopLoop();
  }
}

function startLoop() {
  osc.start();
  loop();
}

function stopLoop() {
  osc.stop();
  noLoop();
  temp = 0;
}

function drawGrid() {
  drawAxes();
  drawUnits();
}

function drawAxes() {
  strokeWeight(1);
  fill(0);

  line(0, height/2, width, height/2); // x-axis
  line(width/2, 0, width/2, height); // y-axis
}

function drawUnits() {
  strokeWeight(1);
  fill(0);

  // x-axis
  for (var i = 0; i*gridSize <= width; i++) {
    line(i*gridSize, height/2-5, i*gridSize, height/2+5);
    text(i-(width/gridSize/2), i*gridSize, height/2+15);
  }

  // y-axis
  for (var i = 0; i*gridSize <= height; i++) {
    line(width/2-5, i*gridSize, width/2+5, i*gridSize);
    text((width/gridSize/2)-i, width/2+10, i*gridSize);
  }
}


// Try y=1,5 but discontinuous at x=0;
function removableDiscontinuity() {
  index = 0;
  translate(width/2, height/2);
  for (var x = -width/2; x <=width/2; x++) {
    y = -(1.5)*gridSize;
    points[index++] = new Point(x, y);
  }
}


// Try y=x
function linear() {
  translate(width/2, height/2); // might be better not use translate
  slope = 1;
  index = 0;
  for (var x = -width/2; x <=width/2; x++) {
    y = -(slope*x);
    points[index++] = new Point(x, y);
  }
  //print(points);
}

// Try y=x^2
function quadratic() {
  translate(width/2, height/2); // might be better not use translate
  slope = 1;
  index = 0;
  for (var x = -width/2/gridSize; x <=width/2/gridSize; x+=0.1) {
    y = -(slope*x*x);
    points[index++] = new Point(x*gridSize, y*gridSize);
  }
  //print(points);
}


function drawEquation() {
  strokeWeight(1);
  beginShape();
  for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
}


/*
function playSound() {
  osc.start();
  for (var i = 0; i < points.length; i++) {
    pitch = map(-points[i].y, -250, 250, 40, 880);
    osc.freq(pitch);
    sleep(10);
  }
  osc.stop();
}

function drawLinearEquation() {
  //y=x
  strokeWeight(1);
  translate(width/2, height/2); // might be better not use translate
  slope = 1;
  beginShape();
  for (var x = -width/2; x <=width/2; x++) {
    y = -(slope*x);
    vertex(x, y);
    pitch = map(-y, -250, 250, 40, 880);
    i = x + 250; // 250 for make array index positive
    pitches[i] = pitch;
  }
  print(pitches);
  endShape();
}

function drawQuadraticEquation() {
  //y=x^2
  strokeWeight(1);
  translate(width/2, height/2);
  slope = 1;
  beginShape();
  for (var x = -width/2/gridSize; x <=width/2/gridSize; x+=0.1) {
    y = -(slope*x*x);
    vertex(x*gridSize, y*gridSize);
  }
  endShape();
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (playing === false) {
      osc.start();
    }
    //playSound();
  }
}

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
function sleep(milliseconds){
    var waitUntil = new Date().getTime() + milliseconds;
    while(new Date().getTime() < waitUntil) true;
}

function playSonification() {
  if (playing === false) {
    print("play");
    osc.start();
    playing = true;
    for (var i = 0; i < pitches.length; i++) {
      osc.freq(pitches[i]);
      sleep(10);
    }
    osc.stop();
    playing = false;
  } else {
    osc.stop();
    playing = false;
  }
}
*/