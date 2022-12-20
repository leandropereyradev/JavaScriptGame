import { BATSDB } from "../utils/batsDB.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";

export class Cages {
  constructor(ctx, initialState) {
    this.ctx = ctx;

    this.xPosition = CANVAS_WIDTH - 30;
    this.yPosition = CANVAS_HEIGHT - 240;

    this.isCageOut = false;
    this.isCageOpen = false;

    this.initialState = initialState;
    this.speed = 1;
    this.hard = 2;

    this.image = new Image();
    this.image.src = BATSDB[this.initialState].src;
  }

  draw() {
    if (this.isCageOpen) {
      this.image.src = BATSDB[2].src;
      this.initialState = 2;
    }
    this.ctx.drawImage(this.image, this.xPosition, this.yPosition, BATSDB[this.initialState].width, BATSDB[this.initialState].height);
  }

  movement() {
    if (this.xPosition <= -BATSDB[this.initialState].width) this.isCageOut = true;

    this.xPosition -= this.speed;
  }
  //TODO agregar un poste a las jaulas
}
