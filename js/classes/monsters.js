import { CANVAS_WIDTH, CANVAS_HEIGHT, CTX } from "../utils/constants.js";
import { MONSTERDB } from "../utils/monsterDB.js";
import { sounds } from "../utils/sounds.js";
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
    this.lives = 100;

    this.switchSprite("Walk");

    this.stopIdleSound = false;
    this.stopDeadSound = false;
    this.stopAttackSound = false;
  }

  healthBar() {
    CTX.fillStyle = "#701400";
    CTX.fillRect(this.position.xPosition + 50, this.position.yPosition - 15, 80, 10);

    CTX.fillStyle = "#0C7000";
    CTX.fillRect(this.position.xPosition + 50, this.position.yPosition - 15, (80 * (this.lives < 0 ? 0 : this.lives)) / 100, 10);
  }

  movement() {
    this.statesMonster();

    if (this.position.xPosition <= -this.widthImg) this.isMonsterOut = true;

    if (!this.stopIdleSound) {
      sounds.monsterAppears.play();
      this.stopIdleSound = true;
    }

    this.position.xPosition -= this.speed;
  }

  statesMonster() {
    switch (this.setState) {
      case "attack":
        this.switchSprite("Attack");
        if (!this.stopAttackSound) {
          sounds.monsterAttack.play();
          this.stopAttackSound = true;
        }
        setTimeout(() => {
          this.setState = "";
          this.speed = 1.3;
          this.stopAttackSound = false;
        }, 200);
        break;

      case "dead":
        this.switchSprite("Dead");
        if (!this.stopDeadSound) {
          sounds.monsterDead.play();
          this.stopDeadSound = true;
        }
        break;

      case "":
        this.switchSprite("Walk");
        break;
    }
  }
}
