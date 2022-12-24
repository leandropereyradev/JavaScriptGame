import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { MONSTERDB } from "../utils/monsterDB.js";
import { Sprite } from "./sprite.js";

export class Monsters extends Sprite {
  constructor(randomStop) {
    super();
    this.distanceFloor = 175;

    this.position = {
      xPosition: CANVAS_WIDTH,
      yPosition: CANVAS_HEIGHT - this.distanceFloor,
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
    this.lives = Math.floor(Math.random() * 10) + 7;
    this.stop = 1;
    this.walk = 1;
    this.randomStop = randomStop;
    this.stoped = false;

    this.switchSprite("Walk");
  }

  movement() {
    this.statesMonster();
    if (this.position.xPosition <= -this.widthImg) this.isMonsterOut = true;

    if (this.stop > this.randomStop && !this.stoped) {
      this.setState = "stop";
      this.speed = 0;
      this.isNotAttacking = true;
      if (this.isMonsterKilled) this.setState = "dead";

      setTimeout(() => {
        this.isNotAttacking = false;
        this.setState = "";
        this.stop = 0;
        this.speed = 1;
      }, 5000);
    }

    this.position.xPosition -= this.speed;
    this.stop++;
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

      case "stop":
        this.switchSprite("Idle");
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
