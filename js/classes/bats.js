import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";

export class Bats {
  constructor(ctx) {
    this.ctx = ctx;
    this.yFloor = CANVAS_HEIGHT - 110;
    this.xPosition = CANVAS_WIDTH;
    this.width = 90;
    this.height = 60;
    this.isBatOut = false;
    this.isBatKilled = false;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.xPosition, this.yFloor, this.width, this.height);
  }

  movement() {
    this.xPosition--;
  }
}
