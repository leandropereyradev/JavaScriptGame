import { BATSDB } from "../utils/batsDB.js";
import { Sprite } from "./sprite.js";

export class Cages extends Sprite {
  constructor(type = "") {
    super();

    this.type = type;

    this.position = {
      xPosition: this.type === "WoodChain" ? 1007 : 990,
      yPosition: this.type === "WoodChain" ? 100 : 200,
    };

    this.hard = Math.floor(Math.random() * 4) + 2;

    this.states = BATSDB;
  }
}
