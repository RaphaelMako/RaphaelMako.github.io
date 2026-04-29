var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
var isDrawing = false;
var lastX = 0;
var lastY = 0;

canvas.addEventListener("mousedown", function (e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", function (e) {
  if (isDrawing) {
    drawLine(context, lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", function () {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", function () {
  isDrawing = false;
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 50;
  context.lineCap = "round";
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log("clear");
}
