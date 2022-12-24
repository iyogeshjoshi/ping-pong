import Constants from "./Constants.mjs";

const { WIDTH, HEIGHT, DIRECTIONS } = Constants;

class Ball {
  constructor(x, y, radius, speed = 5, color = "white") {
    this.original = { x: x, y: y, speed: speed };
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.originalSpeed = speed;
    this.speed = speed;
    this.activeDirection = DIRECTIONS.downRight;
    this.velocityX = this.speed;
    this.velocityY = this.speed;
  }

  get top() {
    return this.y - this.radius;
  }

  get bottom() {
    return this.y + this.radius;
  }

  get left() {
    return this.x - this.radius;
  }

  get right() {
    return this.x + this.radius;
  }

  reset() {
    this.x = this.original.x;
    this.y = this.original.y;
    this.speed = this.original.speed;
    this.velocityX = -this.velocityX;
  }

  collision(player) {
    const collision =
      this.right > player.left &&
      this.top < player.bottom &&
      this.left < player.right &&
      this.bottom > player.top;

    if (collision) {
      this.collidePoint =
        (this.y - (player.y + player.height / 2)) / (player.height / 2);
      this.angleRad = this.collidePoint * (Math.PI / 4);
      this.velocityX = this.speed * Math.cos(this.angleRad);
      this.velocityY = this.speed * Math.sin(this.angleRad);
      if (this.x > WIDTH / 2) {
        this.velocityX *= -1;
        // this.velocityY *= -1;
      }
      this.speed += 0.1;
    }

    return collision;
  }

  draw(player) {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.y + this.radius > HEIGHT || this.y - this.radius < 0) {
      this.velocityY = -this.velocityY;
    }

    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) {
      player.score++;
      this.reset();
    }
    /* if (this.x + this.radius > WIDTH) {
      if (this.activeDirection == DIRECTIONS.downRight)
        this.activeDirection = DIRECTIONS.downLeft;
      else this.activeDirection = DIRECTIONS.topLeft;
    }
    if (this.x - this.radius < 0) {
      if (this.activeDirection == DIRECTIONS.downLeft)
        this.activeDirection = DIRECTIONS.downRight;
      else this.activeDirection = DIRECTIONS.topRight;
    }
    if (this.y + this.radius > HEIGHT) {
      if (this.activeDirection == DIRECTIONS.downRight)
        this.activeDirection = DIRECTIONS.topRight;
      else this.activeDirection = DIRECTIONS.topLeft;
    }
    if (this.y - this.radius < 0) {
      if (this.activeDirection == DIRECTIONS.topRight) {
        this.activeDirection = DIRECTIONS.downRight;
      } else this.activeDirection = DIRECTIONS.downLeft;
    }

    switch (this.activeDirection) {
      case DIRECTIONS.up:
        this.y -= this.speed;
        break;
      case DIRECTIONS.down:
        this.y += this.speed;
        break;
      case DIRECTIONS.left:
        this.x -= this.speed;
        break;
      case DIRECTIONS.right:
        this.x += this.speed;
        break;
      case DIRECTIONS.topRight:
        this.x += this.speed;
        this.y -= this.speed;
        break;
      case DIRECTIONS.topLeft:
        this.x -= this.speed;
        this.y -= this.speed;
        break;
      case DIRECTIONS.downLeft:
        this.x -= this.speed;
        this.y += this.speed;
        break;
      case DIRECTIONS.downRight:
        this.x += this.speed;
        this.y += this.speed;
        break;
    } */
  }
}

export default Ball;
