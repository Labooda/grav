const applyButton = document.querySelector("#apply");
const coordButton = document.querySelector("#coordinate");
const ball = document.querySelector(".ball");
const styles = getComputedStyle(ball);
const boxHeight = parseInt(
  getComputedStyle(document.querySelector(".box")).height
);
const boxWidth = parseInt(
  getComputedStyle(document.querySelector(".box")).width
);

let [inputVelocityX, inputVelocityY] = document.querySelectorAll(".velocity");
let velocityX = 0,
  velocityY = 0;
let [inputAccelX, inputAccelY] = document.querySelectorAll(".accel");
let accelX = 0,
  accelY = 0;
let coordX = parseInt(styles.left) + 0.5 * parseInt(styles.width),
  coordY = parseInt(styles.bottom) + 0.5 * parseInt(styles.height);
let timerId;
let step = 1000 / 60;

coordButton.addEventListener("click", function () {
  const [inputCoordX, inputCoordY] = document.querySelectorAll(".coord");

  if (
    inputCoordX.value &&
    inputCoordX.value >= 0 &&
    parseInt(inputCoordX.value) + parseInt(styles.width) <= boxWidth
  ) {
    ball.style.left = inputCoordX.value + "px";
    coordX = parseInt(inputCoordX.value) + parseInt(styles.width) / 2;
  }

  if (
    inputCoordY.value &&
    inputCoordY.value >= 0 &&
    parseInt(inputCoordY.value) + parseInt(styles.height) <= boxHeight
  ) {
    ball.style.bottom = inputCoordY.value + "px";
    coordY = parseInt(inputCoordY.value) + parseInt(styles.height) / 2;
  }

  velocityX = velocityY = accelX = accelY = 0;
});

applyButton.addEventListener("click", function () {
  if (inputAccelX.value) {
    accelX = inputAccelX.value / 1000;
  }
  if (inputAccelY.value) {
    accelY = inputAccelY.value / 1000;
  }
  if (inputVelocityX.value) {
    velocityX = inputVelocityX.value / 1000;
  }
  if (inputVelocityY.value) {
    velocityY = inputVelocityY.value / 1000;
  }

  timerId = setInterval(move, step);
});

function move() {
  coordX = coordX + velocityX * step + (accelX * (step / 1000) ** 2) / 2;
  coordY = coordY + velocityY * step + (accelY * (step / 1000) ** 2) / 2;

  let left = coordX - 0.5 * parseInt(styles.width),
    bottom = coordY - 0.5 * parseInt(styles.height);

  if (left + parseInt(styles.width) >= boxWidth) {
    ball.style.left = boxWidth - parseInt(styles.width) + "px";
    coordX = boxWidth - parseInt(styles.width) / 2;
    velocityX = -velocityX;
  } else if (left <= 0) {
    ball.style.left = "0px";
    coordX = parseInt(styles.width) / 2;
    velocityX = -velocityX;
  } else {
    ball.style.left = left + "px";
  }

  if (bottom + parseInt(styles.height) >= boxHeight) {
    ball.style.bottom = boxHeight - parseInt(styles.height) + "px";
    coordY = boxHeight - parseInt(styles.height) / 2;
    velocityY = -velocityY;
  } else if (bottom <= 0) {
    ball.style.bottom = "0px";
    coordY = parseInt(styles.height) / 2;
    velocityY = -velocityY;
  } else {
    ball.style.bottom = bottom + "px";
  }

  velocityX = 0.98 * (velocityX + accelX * step);
  velocityY = 0.98 * (velocityY + accelY * step);
}
