import { CANVAS_WIDTH } from "../utils/constants.js";
import { Sprite } from "./sprite.js";

export class SpiritBombs extends Sprite {
  constructor(DataBase, xPositionPlayer, yPositionPlayer, direction) {
    super();
    this.direction = direction;
    this.position = { xPosition: this.direction ? xPositionPlayer : xPositionPlayer - 40, yPosition: yPositionPlayer };
    this.xVelocity = 10;

    this.states = DataBase;

    this.image.src = DataBase.Bomb.image;
    this.scale = DataBase.Bomb.scale;
    this.totalFrames = DataBase.Bomb.totalFrames;
    this.frameBuffer = DataBase.Bomb.frameBuffer;
    this.loop = true;

    this.isSpiritBombCollided = false;
  }

  move() {
    if (this.direction) {
      this.position.xPosition += this.xVelocity;
      if (this.position.xPosition > CANVAS_WIDTH + this.widthImg) this.isSpiritBombCollided = true;
    } else {
      this.position.xPosition -= this.xVelocity;
      if (this.position.xPosition < -this.widthImg) this.isSpiritBombCollided = true;
    }
  }
}
