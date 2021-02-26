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
  playButton.parent("wrapper"); 
  playButton.size(40, 20);

  stopButton = createButton("Stop");
  stopButton.mousePressed(stopLoop);
  stopButton.parent("wrapper");
  stopButton.size(40, 20);

  background(200);
  drawGrid();

  osc = new p5.Oscillator('sine');
  osc.amp(0);

  beat = new p5.Oscillator('sawtooth');
  beat.amp(0);

  quadratic();
}

let temp = 0;
function draw() {
  background(200);
  drawGrid();

  translate(width/2, height/2); // Why do I need translate here?
  drawEquation();

  pitch = map(-points[temp].y, -250, 250, 110, 440);
  //print(-points[temp].y)
  osc.freq(pitch);
  osc.amp(0.5);

  strokeWeight(1);

  // jump 1
  fill(255);
  ellipse(50, -48, 10, 10);
  fill(0);
  ellipse(50, -150, 10, 10);

  // removal 1
  fill(255);
  ellipse(200, 0, 10, 10);
  fill(0);
  ellipse(200, -100, 10, 10);

  if (temp < points.length-1) {
    if (temp%50 === 1 || temp === points.length-2) {
      beat.amp(0.3);
    } else {
      beat.amp(0);
    }

    if (temp >= 195 && temp <= 205) {
      osc.amp(0);
    }

    if (temp >= 445 && temp <= 455) {
      osc.freq(330);
      fill(200);
      ellipse(200, -100, 10, 10);
    }

    fill(200);
    ellipse(points[temp].x, points[temp].y, 10, 10);

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
    strokeWeight(0);
    text(i-(width/gridSize/2), i*gridSize, height/2+15);
    strokeWeight(1);
  }

  // y-axis
  for (var i = 0; i*gridSize <= height; i++) {
    line(width/2-5, i*gridSize, width/2+5, i*gridSize);
    strokeWeight(0);
    text((width/gridSize/2)-i, width/2+10, i*gridSize);
    strokeWeight(1);
  }
}

// y=1/x
function quadratic() {
  translate(width/2, height/2); // might be better not use translate
  slope = 5;
  index = 0;
  for (var x = -width/2; x <=width/2; x++) {
    if (x < -50) {
      y = 0.1/((x+50)/500*(x+50)/500)-50;
    } else if (x === -50) {
      y = 25000;
    } else if (x > -50 && x < 50) {
      y = 0.1/((x+50)/500*(x+50)/500)-50;
    } else if (x > 50) {
      y = x - 200;
    }
    points[index++] = new Point(x, y);
  }
}


function drawEquation() {
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < points.length; i++) {
    if (points[i].x === 50) {
      endShape();
    }
    if (points[i].x === 51) {
      beginShape();
    }

    vertex(points[i].x, points[i].y);
  }
  endShape();
}