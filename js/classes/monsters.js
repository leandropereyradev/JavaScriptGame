import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { MONSTERDB } from "../utils/monsterDB.js";
import { Sprite } from "./sprite.js";

export class Monsters extends Sprite {
  constructor() {
    super();
    this.position = {
      xPosition: CANVAS_WIDTH,
      yPosition: CANVAS_HEIGHT - 175,
    };

    this.xLocation = 70;
    this.wLocation = 150;

    this.states = MONSTERDB;

    this.isMonsterOut = false;
    this.isMonsterKilled = false;
    this.isNotAttacking = false;
    this.isAttacked = false;
    this.isAttacking = false;

    this.setState = "";

    this.speed = Math.floor(Math.random() * 3) + 1;
    this.lives = Math.floor(Math.random() * 5) + 3;

    this.switchSprite("Walk");
  }

  movement() {
    this.statesMonster();
    if (this.position.xPosition <= -this.widthImg) {
      this.isMonsterOut = true;
    }

    this.position.xPosition -= this.speed;
  }

  statesMonster() {
    switch (this.setState) {
      case "attack":
        this.switchSprite("Attack");
        setTimeout(() => {
          this.setState = "";
          this.speed = 1.3;
        }, 200);
        break;

      case "dead":
        this.switchSprite("Dead");
        break;

      case "":
        this.switchSprite("Walk");
        break;
    }
  }
}
