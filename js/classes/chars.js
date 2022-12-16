import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { PLAYERDB } from "../utils/playerDB.js";

export class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 60;
    this.y = 0;
    this.width = 60;
    this.height = 90;
    this.key = "";
    this.initialState = 0;
    this.state = () => this.initialState;
    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.lives = 5;
    this.isDead = false;
    this.isDone = false;

    this.xVelocity = 5;
    this.speed = 0;
    this.yVertical = 1;
    this.gravity = 1;
  }

  charAnimations() {
    this.draw();
    this.animateFrames();
    this.movement();
  }

  draw() {
    this.image.src = PLAYERDB[this.state()].src;
    this.ctx.drawImage(
      this.image,
      PLAYERDB[this.state()].initialFrame * PLAYERDB[this.state()].width,
      0,
      PLAYERDB[this.state()].width,
      PLAYERDB[this.state()].height,
      this.x,
      this.y,
      PLAYERDB[this.state()].widthSize,
      PLAYERDB[this.state()].heightSize
    );
  }

  animateFrames() {
    if (this.gameFrame % PLAYERDB[this.state()].stepFrames === 0) {
      if (PLAYERDB[this.state()].initialFrame <= this.finalFrames) PLAYERDB[this.state()].initialFrame = PLAYERDB[this.state()].frameReset;

      PLAYERDB[this.state()].initialFrame--;
    }
    this.gameFrame++;
  }

  movement() {
    if (!this.isDone) {
      switch (this.key) {
        case "ArrowRight":
          this.initialState = 1;
          this.speed = 5;
          break;
        case "ArrowLeft":
          this.initialState = 1;
          this.speed = -5;
          break;
        case "r":
          this.initialState = 7;
          setTimeout(() => {
            this.key = "";
          }, 1000);
          break;
        case "Control":
          this.initialState = 2;
          setTimeout(() => {
            this.key = "";
          }, 200);
          break;
        case " ":
          if (this.onFloor()) {
            this.initialState = 0;
            this.yVertical = -20;
          }
          break;
        case "":
          if (this.isDead) {
            this.initialState = 5;
            setTimeout(() => {
              this.isDone = true;
            }, 1000);
          } else {
            this.initialState = 0;
            this.speed = 0;
          }

          break;
      }
    } else {
      this.initialState = 6;
      this.y = CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
      if (this.key === "r") {
        this.isDone = false;
        this.isDead = false;
        this.lives = 1
      }
    }

    this.x += this.speed;
    this.y += this.yVertical;

    if (!this.isDone) {
      if (!this.onFloor()) {
        this.yVertical += this.gravity;
      } else {
        this.yVertical = 0;
      }

      if (this.y >= CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50) {
        this.y = CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
      }
    }
  }

  onFloor() {
    return this.y >= CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
  }

  takeHits() {}

  dead() {}
}
