import { CANVAS_WIDTH } from "../utils/constants.js";
import { PLAYERDB } from "../utils/playerDB.js";
import { Sprite } from "./sprite.js";

export class SpiritBombs extends Sprite {
  constructor(ctx, xPosition, yPosition) {
    super(ctx);

    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = 0;
    this.height = 0;
    this.xVelocity = 10;

    this.finalFrames = 0;
    this.gameFrame = 0;

    this.isSpiritBombCollided = false;
  }

  draw() {
    this.width = PLAYERDB[3].width;
    this.height = PLAYERDB[3].height;
    super.draw(
      PLAYERDB[3].src,
      PLAYERDB[3].initialFrame * PLAYERDB[3].width,
      PLAYERDB[3].width,
      PLAYERDB[3].height,
      this.xPosition,
      this.yPosition,
      PLAYERDB[3].widthSize,
      PLAYERDB[3].heightSize
    );
  }

  animateFrames() {
    // super.animateFrames(PLAYERDB[3].stepFrames, PLAYERDB[3].initialFrame, PLAYERDB[3].frameReset);

    if (this.gameFrame % PLAYERDB[3].stepFrames === 0) {
      if (PLAYERDB[3].initialFrame <= this.finalFrames) PLAYERDB[3].initialFrame = PLAYERDB[3].frameReset;

      PLAYERDB[3].initialFrame--;
    }
    this.gameFrame < 100 ? this.gameFrame++ : (this.gameFrame = 0);
  }

  move() {
    this.xPosition += this.xVelocity;

    if (this.xPosition > CANVAS_WIDTH) this.isSpiritBombCollided = true;
  }
}
