import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { PLAYERDB } from "../utils/playerDB.js";
import { Sprite } from "./sprite.js";

export class Chars extends Sprite {
  constructor(ctx) {
    super(ctx);

    this.ctx = ctx;
    this.xPosition = 60;
    this.yPosition = 0;
    this.key = "";

    this.initialState = 0;
    this.state = () => this.initialState;
    this.width = 0;

    this.gameFrame = 0;
    this.finalFrames = 0;

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
    this.width = PLAYERDB[this.state()].width;
    super.draw(
      PLAYERDB[this.state()].src,
      PLAYERDB[this.state()].initialFrame * this.width,
      this.width,
      PLAYERDB[this.state()].height,
      this.xPosition,
      this.yPosition,
      PLAYERDB[this.state()].widthSize,
      PLAYERDB[this.state()].heightSize
    );
  }

  animateFrames() {
    // super.animateFrames(0, PLAYERDB[this.state()].stepFrames, PLAYERDB[this.state()].initialFrame, 0, PLAYERDB[this.state()].frameReset);
    if (this.gameFrame % PLAYERDB[this.state()].stepFrames === 0) {
      if (PLAYERDB[this.state()].initialFrame <= this.finalFrames) PLAYERDB[this.state()].initialFrame = PLAYERDB[this.state()].frameReset;

      PLAYERDB[this.state()].initialFrame--;
      // console.log(PLAYERDB[this.state()].initialFrame)
    }
    this.gameFrame < 100 ? this.gameFrame++ : (this.gameFrame = 0);
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
          }, 900);
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
      this.yPosition = CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
      if (this.key === "r") {
        this.isDone = false;
        this.isDead = false;
        this.lives = 1;
      }
    }

    this.xPosition += this.speed;
    this.yPosition += this.yVertical;

    if (!this.isDone) {
      if (!this.onFloor()) {
        this.yVertical += this.gravity;
      } else {
        this.yVertical = 0;
      }

      if (this.yPosition >= CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50) {
        this.yPosition = CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
      }
    }
  }

  onFloor() {
    return this.yPosition >= CANVAS_HEIGHT - PLAYERDB[this.state()].heightSize - 50;
  }

  takeHits() {}

  dead() {}
}
