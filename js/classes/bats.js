import { BATSDB } from "../utils/batsDB.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, selectBats } from "../utils/constants.js";
import { sounds } from "../utils/sounds.js";
import { Cages } from "./cages.js";
import { Sprite } from "./sprite.js";

export class Bats extends Sprite {
  constructor(game, xFinalPosition, yFinalPosition) {
    super();
    this.game = game;
    this.position = {
      xPosition: !xFinalPosition ? CANVAS_WIDTH - 10 : xFinalPosition,
      yPosition: !yFinalPosition ? CANVAS_HEIGHT - 250 : yFinalPosition,
    };

    this.states = BATSDB;
    this.switchSprite(selectBats());

    this.isBatFreed = false;
    this.isBatOut = false;

    this.cageBack = new Cages();
    this.cageBack.switchSprite("CageBack");

    this.cageDoorClosed = new Cages();

    this.wood = new Cages("WoodChain");
    this.wood.switchSprite("WoodChain");

    this.finalBack = new Cages();
    this.finalBack.switchSprite("FinalBack");
    this.finalBack.hard = 10;

    this.finalDoor = new Cages();
    this.finalDoor.switchSprite("FinalClose");
    this.finalDoor.hard = 10;

    this.cageSpeed = 1;
    this.batSpeed = 1;

    this.stopSoundBats = false;
    this.stopSoundBatsFreed = false;
    this.stopSoundCage = false;

    this.tickBat = 60;
  }

  drawBats() {
    this.wood.draw();
    this.cageBack.draw();
    this.draw();

    this.cageDoorClosed.switchSprite(this.isBatFreed ? "DoorOpened" : "DoorClosed");

    this.cageDoorClosed.draw();
  }

  batsAppears() {
    this.tickBat--;

    if (this.tickBat <= 0) {
      this.tickBat = Math.floor(Math.random() * 500) + 300;

      if (!this.game.isFinal) {
        const bat = new Bats();
        this.game.bats.push(bat);
      }
    }
  }

  movement() {
    if (!this.stopSoundBats) {
      sounds.bats.play();
      this.stopSoundBats = true;
    }

    if (!this.stopSoundBatsFreed && this.isBatFreed) {
      sounds.cageOpen.play();
      this.stopSoundBatsFreed = true;
    }

    if (this.position.yPosition <= -this.heightImg * 2) this.batSpeed = 0;

    if (this.wood.position.xPosition <= -this.cageBack.widthImg) this.isBatOut = true;

    if (this.isBatFreed) this.position.yPosition -= this.batSpeed;

    this.position.xPosition -= this.batSpeed;
    this.wood.position.xPosition -= this.cageSpeed;
    this.cageBack.position.xPosition -= this.cageSpeed;
    this.cageDoorClosed.position.xPosition -= this.cageSpeed;
  }

  final() {
    if (!this.stopSoundBats) {
      sounds.finalBats.play();
      this.stopSoundBats = true;
    }

    if (this.isBatFreed && !this.stopSoundCage) {
      sounds.cageOpen.play();
      this.stopSoundCage = true;
    }

    this.finalBack.position.yPosition = 60;

    this.finalDoor.position.yPosition = 60;

    this.finalBack.position.xPosition -= this.cageSpeed;
    this.finalDoor.position.xPosition -= this.cageSpeed;

    if (this.finalBack.position.xPosition <= CANVAS_WIDTH - 250) this.cageSpeed = 0;
  }
}
