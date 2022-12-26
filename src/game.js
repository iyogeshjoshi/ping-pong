// import Player from "/src/modules/player.mjs";
import Player from "./modules/Player.mjs";
import Ball from "./modules/Ball.mjs";
import Constants from "./modules/Constants.mjs";

const { WIDTH, HEIGHT, SPEED, BarHeight, BarWidth } = Constants;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const net = {
  x: WIDTH / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white",
};

const BALL = new Ball(WIDTH / 2, HEIGHT / 2, 10, SPEED, "white");
const PLAYER = new Player(
  0,
  HEIGHT / 2 - BarHeight / 2,
  BarWidth,
  BarHeight,
  "whitesmoke"
);
const COMP = new Player(
  WIDTH - BarWidth,
  HEIGHT / 2 - BarHeight / 2,
  BarWidth,
  BarHeight,
  "whitesmoke"
);

const PLAYERS = [PLAYER, COMP];

/**
 * left = 37
 * up = 38
 * right = 39
 * down = 40
 */

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawText(x, y, text, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy";
  ctx.fillText(text, x, y);
}

function drawNet() {
  console.log("drawing net");
  for (let i = 0; i <= HEIGHT; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function AI(player, ball, level = 0.1) {
  player.y += (ball.y - (player.y + player.height / 2)) * level;
}

function animate() {
  // clear canvas
  drawRect(0, 0, canvas.width, canvas.height, "black");

  // draw net
  drawNet();
  // draw paddlea
  PLAYERS.forEach((player) => {
    drawRect(player.x, player.y, player.width, player.height, player.color);
  });
  // comp AI
  AI(COMP, BALL, 0.1);
  // draw score
  drawText(WIDTH / 4, HEIGHT / 5, PLAYER.score, "white");
  drawText((WIDTH * 3) / 4, HEIGHT / 5, COMP.score);
  // draw ball
  drawCircle(BALL.x, BALL.y, BALL.radius, BALL.color);

  BALL.collision(BALL.x < WIDTH / 2 ? PLAYER : COMP);
  BALL.draw(BALL.x < WIDTH / 2 ? COMP : PLAYER);

  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();

  PLAYER.y = e.clientY - rect.top - PLAYER.height / 2;
});

window.onload = () => {
  animate();
};
