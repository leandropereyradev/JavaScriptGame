import { CANVAS_WIDTH } from "../utils/constants.js";
import { PLAYERDB } from "../utils/playerDB.js";

export class SpiritBombs {
  constructor(ctx, xPosition, yPosition) {
    this.ctx = ctx;

    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.widthBomb = 50;
    this.heigthBomb = 50;
    this.xVelocity = 10;

    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.isSpiritBombCollided = false;
  }

  bombAnimations() {
    this.draw();
    this.animateFrames();
  }

  draw() {
    this.image.src = PLAYERDB[3].src;
    this.ctx.drawImage(
      this.image,
      PLAYERDB[3].initialFrame * PLAYERDB[3].width,
      0,
      PLAYERDB[3].width,
      PLAYERDB[3].height,
      this.xPosition,
      this.yPosition,
      PLAYERDB[3].widthSize,
      PLAYERDB[3].heightSize
    );
  }

  animateFrames() {
    if (this.gameFrame % PLAYERDB[3].stepFrames === 0) {
      if (PLAYERDB[3].initialFrame <= this.finalFrames) PLAYERDB[3].initialFrame = PLAYERDB[3].frameReset;

      PLAYERDB[3].initialFrame--;
    }
    this.gameFrame++;
  }

  move() {
    this.xPosition += this.xVelocity;
    if (this.xPosition > CANVAS_WIDTH) this.isSpiritBombCollided = true;
  }
}
