import { CANVAS_WIDTH } from "../utils/constants.js";
import { BOSSDB } from "../utils/bossDB.js";
import { Sprite } from "./sprite.js";

export class Boss extends Sprite {
  constructor() {
    super();

    this.position = {
      xPosition: CANVAS_WIDTH + 400,
      yPosition: 0,
    };

    this.states = BOSSDB;
    this.setState = "walk";
    this.width = 200;
    this.height = 270;
    this.xLocation = 250;
    this.yLocation = 350;

    this.isAttacking = false;
    this.isAttacked = false;
    this.isBossAppear = false;
    this.isBossDead = false;

    this.speed = 1;
    this.lives = 50;
  }

  bossAnimations() {
    this.draw();
    this.movement();
    this.statesMonster();
  }

  movement() {
    if (this.isAttacking) {
      if (this.position.xPosition <= -150) {
        this.speed = -1.5;
        this.setState = "walkright";
      }
      if (this.position.xPosition >= CANVAS_WIDTH - this.widthImg && !this.isBossDead) {
        this.speed = 1.5;
        this.setState = "walk";
      }
    } else {
      if (this.position.xPosition <= 550 - this.xLocation) {
        this.setState = "idle";
        this.speed = 0;
        this.isAttacking = true;
      }
    }

    this.position.xPosition -= this.speed;
  }

  statesMonster() {
    switch (this.setState) {
      case "idle":
        this.switchSprite("Idle");
        break;

      case "walk":
        this.switchSprite("Walk");
        break;

      case "walkright":
        this.switchSprite("WalkRight");
        break;

      case "attack":
        this.switchSprite("Attack");
        break;

      case "attackright":
        this.switchSprite("AttackRight");
        break;
    }
  }
}
