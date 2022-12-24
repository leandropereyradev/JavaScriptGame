import { CANVAS_WIDTH } from "../utils/constants.js";
import { PLAYERDBR } from "../utils/playerDB.js";
import { Sprite } from "./sprite.js";

export class SpiritBombs extends Sprite {
  constructor(xPositionPlayer, yPositionPlayer, direction) {
    super();
    this.direction = direction;
    this.position = { xPosition: this.direction ? xPositionPlayer : xPositionPlayer - 40, yPosition: yPositionPlayer };
    this.xVelocity = 10;

    this.image.src = PLAYERDBR.Bomb.image;
    this.scale = PLAYERDBR.Bomb.scale;
    this.totalFrames = PLAYERDBR.Bomb.totalFrames;
    this.frameBuffer = PLAYERDBR.Bomb.frameBuffer;
    this.loop = true;

    this.isSpiritBombCollided = false;
  }

  move() {
    if (this.direction) {
      this.position.xPosition += this.xVelocity;
      if (this.position.xPosition > CANVAS_WIDTH + this.width) this.isSpiritBombCollided = true;
    } else {
      this.position.xPosition -= this.xVelocity;
      if (this.position.xPosition < -this.width) this.isSpiritBombCollided = true;
    }
  }
}
