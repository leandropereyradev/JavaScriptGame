import { BATSDB } from "../utils/batsDB.js";
import { CANVAS_WIDTH } from "../utils/constants.js";
import { Cages } from "./cages.js";
import { Sprite } from "./sprite.js";

export class Bats extends Sprite {
  constructor(positionBats, type) {
    super();
    this.position = {
      xPosition: positionBats.x,
      yPosition: positionBats.y,
    };

    this.states = BATSDB;
    this.switchSprite(type);

    this.isBatFreed = false;
    this.isBatOut = false;

    this.cageBack = new Cages();
    this.cageBack.switchSprite("CageBack");

    this.cageDoorClosed = new Cages();

    this.wood = new Cages("WoodChain");
    this.wood.switchSprite("WoodChain");

    this.stopBatFinal = 10;
    this.finalBack = new Cages();
    this.finalBack.switchSprite("FinalBack");
    this.finalBack.hard = 10;

    this.finalDoor = new Cages();
    this.finalDoor.switchSprite("FinalClose");
    this.finalDoor.hard = 10;

    this.cageSpeed = 1;
    this.batSpeed = 1;
  }

  drawBats() {
    this.wood.draw();
    this.cageBack.draw();
    this.draw();

    this.cageDoorClosed.switchSprite(this.isBatFreed ? "DoorOpened" : "DoorClosed");

    this.cageDoorClosed.draw();
  }

  movement() {
    if (this.position.yPosition <= -this.heightImg * 2) this.batSpeed = 0;

    if (this.wood.position.xPosition <= -this.cageBack.widthImg) this.isBatOut = true;

    if (this.isBatFreed) this.position.yPosition -= this.batSpeed;

    this.position.xPosition -= this.batSpeed;
    this.wood.position.xPosition -= this.cageSpeed;
    this.cageBack.position.xPosition -= this.cageSpeed;
    this.cageDoorClosed.position.xPosition -= this.cageSpeed;
  }

  final() {
    this.finalBack.position.yPosition = 60;

    this.finalDoor.position.yPosition = 60;

    this.finalBack.position.xPosition -= this.cageSpeed;
    this.finalDoor.position.xPosition -= this.cageSpeed;
    if (this.finalBack.position.xPosition <= CANVAS_WIDTH - 250) this.cageSpeed = 0;
  }
}
