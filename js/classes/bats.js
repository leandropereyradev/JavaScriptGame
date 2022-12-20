import { BATSDB } from "../utils/batsDB.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { Sprite } from "./sprite.js";

export class Bats extends Sprite {
  constructor(ctx, initialFrame, id) {
    super(ctx);
    this.yPosition = CANVAS_HEIGHT - 220;
    this.xPosition = CANVAS_WIDTH - 10;
    this.width = 90;
    this.height = 60;
    this.isBatOut = false;
    this.isBatFreed = false;
    this.gameFrame = 0;
    this.finalFrames = 0;
    this.initialState = initialFrame;
    this.speed = 1;
    this.id = id;
  }

  draw() {
    this.height = BATSDB[this.initialState].height;
    this.width = BATSDB[this.initialState].width;

    super.draw(
      BATSDB[this.initialState].src,
      BATSDB[this.initialState].initialFrame * BATSDB[this.initialState].width,
      BATSDB[this.initialState].width,
      BATSDB[this.initialState].height,
      this.xPosition,
      this.yPosition,
      BATSDB[this.initialState].widthSize,
      BATSDB[this.initialState].heightSize
    );
  }

  animateFrames() {
    // super.animateFrames(0, PLAYERDB[this.state()].stepFrames, PLAYERDB[this.state()].initialFrame, 0, PLAYERDB[this.state()].frameReset);

    if (this.gameFrame % BATSDB[this.initialState].stepFrames === 0) {
      if (BATSDB[this.initialState].initialFrame <= this.finalFrames)
        BATSDB[this.initialState].initialFrame = BATSDB[this.initialState].frameReset;

      BATSDB[this.initialState].initialFrame--;
      // console.log(PLAYERDB[this.state()].initialFrame)
    }

    this.gameFrame < 100 ? this.gameFrame++ : (this.gameFrame = 0);
  }

  movement() {
    if (this.xPosition <= -BATSDB[this.initialState].width || this.yPosition <= -BATSDB[this.initialState].height) this.isBatOut = true;

    if (this.isBatFreed) this.yPosition -= this.speed;

    this.xPosition -= this.speed;
  }
}
