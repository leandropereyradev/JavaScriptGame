import { CANVAS_WIDTH } from "../utils/constants.js";
import { BOSSDB } from "../utils/bossDB.js";
import { Sprite } from "./sprite.js";
import { sounds } from "../utils/sounds.js";

export class Boss extends Sprite {
  constructor() {
    super();

    this.position = {
      xPosition: CANVAS_WIDTH + 400,
      yPosition: -80,
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

    this.bossSoundIdle = false;
    this.bossSoundAttack = false;
    this.bossSoundWalk = false;
    this.bossSoundFinal = false;
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

    if (!this.bossSoundIdle) {
      sounds.bossIdle.play();
      this.bossSoundIdle = true;
    }

    if (this.isBossDead && this.position.xPosition > CANVAS_WIDTH) {
      this.speed = 0;
      sounds.bossIdle.stop();
      sounds.bossWalk.stop();
    }

    if (this.isBossAppear && !this.bossSoundFinal) {
      sounds.backgoundSound.stop();
      sounds.backgoundSoundBattle.play();
      this.bossSoundFinal = true;
    }
  }

  statesMonster() {
    switch (this.setState) {
      case "idle":
        this.switchSprite("Idle");
        this.bossSoundAttack = false;
        this.bossSoundWalk = false;
        sounds.bossWalk.stop();

        break;

      case "walk":
        this.switchSprite("Walk");
        if (!this.bossSoundWalk) {
          sounds.bossWalk.play();
          this.bossSoundWalk = true;
        }
        this.bossSoundAttack = false;
        break;

      case "walkright":
        this.switchSprite("WalkRight");
        if (!this.bossSoundWalk) {
          sounds.bossWalk.play();
          this.bossSoundWalk = true;
        }
        this.bossSoundAttack = false;
        break;

      case "attack":
        this.switchSprite("Attack");
        if (!this.bossSoundAttack) {
          sounds.bossAttack.play();
          this.bossSoundAttack = true;
        }
        this.bossSoundWalk = false;
        sounds.bossWalk.stop();
        break;

      case "attackright":
        this.switchSprite("AttackRight");
        if (!this.bossSoundAttack) {
          sounds.bossAttack.play();
          this.bossSoundAttack = true;
        }
        this.bossSoundWalk = false;
        sounds.bossWalk.stop();
        break;
    }
  }
}
