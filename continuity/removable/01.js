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
}

const width = 500;
const height = 500;
const gridSize = 50;

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

  beat = new p5.Oscillator('sawtooth');
  beat.amp(0);

  linear();
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
  ellipse(50, -50, 10, 10);

  // moving point
  fill(0);
  ellipse(points[temp].x, points[temp].y, 10, 10);

  if (temp < points.length-1) {
    if (temp%50 === 1 || temp === points.length-2) {
      beat.amp(0.3);
    } else {
      beat.amp(0);
    }

    if (temp > 295 && temp < 315) {
      osc.amp(0);
    } else {
      osc.amp(0.5);
    }

    temp = temp + 1;
  } else {
    stopLoop();
  }
}

function startLoop() {
  osc.start();
  beat.start();
  loop();
}

function stopLoop() {
  osc.stop();
  osc.amp(0);
  beat.stop();
  beat.amp(0);
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

// y=x
function linear() {
  translate(width/2, height/2); // might be better not use translate
  slope = 1;
  index = 0;
  for (var x = -width/2; x <=width/2; x++) {
    y = -(slope*x);
    points[index++] = new Point(x, y);
  }
}

function drawEquation() {
  strokeWeight(1);
  beginShape();
  for (var i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
}