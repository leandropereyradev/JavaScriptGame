import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";

export class Monsters {
  constructor(ctx) {
    this.ctx = ctx;
    this.yFloor = CANVAS_HEIGHT - 160;
    this.xPosition = CANVAS_WIDTH;
    this.width = 40;
    this.height = 110;
    this.isMonsterOut = false;
    this.isBatKilled = false;
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.xPosition, this.yFloor, this.width, this.height);
  }

  movement() {
    this.xPosition--;
  }
}
