import { BATSDB } from "../utils/batsDB.js";

export class Cages {
  constructor(ctx, initialState, xPosition, yPosition) {
    this.ctx = ctx;

    this.yPosition = yPosition;
    this.xPosition = xPosition;
    this.width = 0;
    this.height = 0;

    this.isCageOut = false;
    this.isCageOpen = false;

    this.initialState = initialState;
    this.speed = 1;
    this.hard = Math.floor(Math.random() * 4) + 2;

    this.image = new Image();
    this.image.src = BATSDB[this.initialState].src;
  }

  draw() {
    this.width = BATSDB[this.initialState].width;
    this.height = BATSDB[this.initialState].height;
    if (this.isCageOpen) {
      this.image.src = BATSDB[2].src;
      this.initialState = 2;
    }
    this.ctx.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
  }

  movement() {
    if (this.xPosition <= -BATSDB[this.initialState].width) this.isCageOut = true;

    this.xPosition -= this.speed;
  }
  //TODO agregar un poste a las jaulas
}
