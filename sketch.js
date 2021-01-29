const width = 500;
const height = 500;
const gridSize = 25;

function setup() {
  createCanvas(width,height);
  background(200);
  drawGrid();

  noFill();

  //drawLinearEquation();
  drawQuadraticEquation();
}

function draw() {

}

function drawGrid() {
  drawAxes();
  drawUnits();
}

function drawAxes() {
  strokeWeight(1);
  line(0, height/2, width, height/2); // x-axis
  line(width/2, 0, width/2, height); // y-axis
}

function drawUnits() {
  strokeWeight(1);

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

function drawLinearEquation() {
  //y=x
  strokeWeight(1);
  translate(width/2, height/2);
  slope = 1;
  beginShape();
  for (var x = -width/2; x <=width/2; x++) {
    y = -(slope*x);
    vertex(x, y);
  }  
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