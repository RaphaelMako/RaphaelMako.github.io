// Boid class
let width = document.getElementById("boids").clientWidth;
console.log(width);
let height = document.getElementById("boids").clientHeight;
console.log(height);

let numBoids = 100;
let visualRange = 100;
const padding = 200;

const ctx = document.getElementById("boids").getContext("2d");

let boids = [];

class Boid {
  constructor() {
    // Setting the boid's visual range
    this.visualRange = visualRange;

    // Setting the boid's position
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // console.log(this.x, this.y);

    // Setting the boid's velocity vectors
    this.dx = Math.random() * 6 - 3;
    this.dy = Math.random() * 6 - 3;

    // Setting the boid's 3 rules as defined by Craig Reynolds
    this.cohesion = 0.01;
    this.separation = 10;
    this.alignment = 0.01;

    // Setting the boid's maximum speed
    this.maxSpeed = 6;

    // Setting the boid's minimum distance from other boids
    this.minDistance = 20;
  }
}

// Finding the distance between any two boids using the Pythagorean theorem
const distanceBoids = (boid1, boid2) => {
  let dx = boid2.x - boid1.x;
  let dy = boid2.y - boid1.y;

  return Math.sqrt(dx * dx + dy * dy);
};

const distancePoints = (x1, y1, x2, y2) => {
  let dx = x2 - x1;
  let dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
};

const neighbours = (boid) => {
  let neighbours = [];
  for (let b of boids) {
    if (b !== boid && distanceBoids(b, boid) < boid.visualRange) {
      neighbours.push(b);
    }
  }
  return neighbours;
};

// Finding the center of mass of a group of boids while
const centerOMass = (boids) => {
  let x = 0;
  let y = 0;

  for (let boid of boids) {
    x += boid.x;
    y += boid.y;
  }

  x /= boids.length;
  y /= boids.length;

  return [x, y];
};

function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function towardCOM(boid, com) {
  // Find the speed of the vector based on the distance between it and the com
  if (!isNaN(com[0])) {
    console.log("wtf" + com[0] + " " + com[1]);
    distance = distancePoints(boid.x, boid.y, com[0], com[1]);
    speed = (boid.visualRange / boid.visualRange) * boid.maxSpeed;

    // Find the angle of the vector based on the distance between it and the com
    boidAngle = calcAngleDegrees(boid.dx, boid.dy);
    comAngle = calcAngleDegrees(com[0] - boid.x, com[1] - boid.y);

    difAngle = (comAngle - boidAngle) * boid.cohesion;

    boid.dx = Math.cos(difAngle) * speed;
    boid.dy = Math.sin(difAngle) * speed;
  } else {
    console.log("toward COM dx: " + this.dx + "" + " dy: " + this.dy);
    console.log("breaking point 1?");
  }
}

function awayFromOthers(boid, neighbours) {
  for (let b of neighbours) {
    if (distanceBoids(boid, b) < boid.minDistance) {
      boidAng = calcAngleDegrees(boid.dx, boid.dy);
      bAng = calcAngleDegrees(b.dx, b.dy);

      speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
      difAngle = (bAng - boidAng) * boid.separation;

      boid.dx = Math.cos(difAngle) * speed;
      boid.dy = Math.sin(difAngle) * speed;
    }
  }
}

function matchVelocity(boid, neighbours) {
  if (neighbours.length != 0) {
    let avgDX = 0;
    let avgDY = 0;

    let maxSpeed = 0;
    for (let b of neighbours) {
      if (b.dx + b.dy > maxSpeed) {
        maxSpeed = b.dx + b.dy;
        avgDX = b.dx;
        avgDY = b.dy;
      }
    }

    // avgDX /= neighbours.length;
    // avgDY /= neighbours.length;

    boid.dx += (avgDX - boid.dx) * boid.alignment;
    boid.dy += (avgDY - boid.dy) * boid.alignment;
  }
}

function drawBoid(ctx, boid) {
  const angle = Math.atan2(boid.dy, boid.dx);
  ctx.translate(boid.x, boid.y);
  ctx.rotate(angle);
  ctx.translate(-boid.x, -boid.y);
  ctx.fillStyle = "#558cf4";
  ctx.beginPath();
  ctx.moveTo(boid.x, boid.y);
  ctx.lineTo(boid.x - 15, boid.y + 5);
  ctx.lineTo(boid.x - 15, boid.y - 5);
  ctx.lineTo(boid.x, boid.y);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  //   if (DRAW_TRAIL) {
  //     ctx.strokeStyle = "#558cf466";
  //     ctx.beginPath();
  //     ctx.moveTo(boid.history[0][0], boid.history[0][1]);
  //     for (const point of boid.history) {
  //       ctx.lineTo(point[0], point[1]);
  //     }
  //     ctx.stroke();
  //   }
}

function sizeCanvas() {
  const canvas = document.getElementById("boids");
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
function createBoid() {
  const newBoid = new Boid();
  boids.push(newBoid);
  drawBoid(ctx, newBoid);
}

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function render() {
  boids.forEach((boid) => {
    drawBoid(ctx, boid);
  });
}

function update() {
  for (let boid of boids) {
    let buds = neighbours(boid);
    let com = centerOMass(buds);
    // towardCOM(boid, com);
    // awayFromOthers(boid, buds);
    matchVelocity(boid, buds);

    boid.x += boid.dx;
    boid.y += boid.dy;

    if (boid.x > width - padding) {
      console.log("EDGE!!");
      boid.dx = boid.dx * -1 - 3;
    } else if (boid.x < padding) {
      boid.dx = boid.dx * -1 + 3;
    }

    if (boid.y > height - padding) {
      boid.dy = boid.dy * -1 - 3;
    } else if (boid.y < padding) {
      boid.dy = boid.dy * -1 + 3;
    }
  }
}
window.onload = () => {
  // Make sure the canvas always fills the whole window
  window.addEventListener("resize", sizeCanvas, false);
  sizeCanvas();

  for (let i = 0; i < numBoids; i++) {
    createBoid();
  }

  //   function loop() {
  //     update();
  //     render();
  //     requestAnimationFrame(loop);
  //     console.log("looping");
  //   }
};

function animate() {
  clearCanvas();
  update();
  render();
  requestAnimationFrame(animate);
}

// animate();

function updateLoop() {
  clearCanvas();
  update();
  render();
}
document.getElementById("loop").addEventListener("click", () => {
  updateLoop();
});
