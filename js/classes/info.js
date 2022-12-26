import { DISPLAYDB } from "../utils/displayDB.js";
import { Sprite } from "./sprite.js";

export class Info extends Sprite {
  constructor(xPos, yPos) {
    super();
    this.states = DISPLAYDB;
    this.position = {
      xPosition: xPos,
      yPosition: yPos,
    };
  }
}
