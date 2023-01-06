import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils/constants.js";
import { PLAYERDBL, PLAYERDBR } from "../utils/playerDB.js";
import { sounds } from "../utils/sounds.js";
import { Hearts } from "./hearts.js";
import { SpiritBombs } from "./spiritBombs.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor() {
    super();
    this.position = { xPosition: 60, yPosition: 400 };
    this.right = true;
    this.states = PLAYERDBR;

    this.key = "";
    this.width = 60;
    this.height = 80;

    this.lives = 10;
    this.isDead = false;
    this.isDone = false;
    this.takedHit = false;
    this.isTaked = false;
    this.isWinner = false;

    this.xVelocity = 5;
    this.speed = 0;
    this.yVertical = 1;
    this.gravity = 0.5;

    this.spiritBombs = [];

    this.hearts = new Hearts();
  }

  charAnimations() {
    this.draw();
    this.movement();
    this.spiritBombs.forEach((bomb) => {
      bomb.draw();
      bomb.move();
    });

    if (!this.isWinner) this.hearts.draw(this.lives);

    this.dead();

    this.right ? (this.states = PLAYERDBR) : (this.states = PLAYERDBL);
  }

  playerAttack() {
    const x = this.right ? this.position.xPosition : this.position.xPosition;
    const y = this.position.yPosition + 40;
    const spiritBomb = new SpiritBombs(PLAYERDBR, x, y, this.right, "bomb");
    this.spiritBombs.push(spiritBomb);
  }

  movement() {
    if (!this.isDead && !this.isWinner) {
      switch (this.key) {
        case "ArrowRight":
          this.right = true;
          this.switchSprite("Run");
          this.speed = 5;
          break;
        case "ArrowLeft":
          this.right = false;
          this.switchSprite("Run");
          this.speed = -5;
          break;
        case "Control":
          this.switchSprite("Attack");
          setTimeout(() => {
            this.key = "";
          }, 400);
          break;
        case " ":
          if (this.onFloor()) {
            this.switchSprite("Idle");
            this.yVertical = -17;
          }
          break;
        case "":
          if (this.takedHit) {
            this.switchSprite("TakeHits");
            sounds.playerHurts.play();

            setTimeout(() => {
              this.takedHit = false;
            }, 500);
          } else {
            this.switchSprite("Idle");
            this.speed = 0;
          }
          break;
      }

      this.position.xPosition += this.speed;
      this.position.yPosition += this.yVertical;
    } else {
      if (this.key === "r") {
        this.isDead = false;
        this.lives = 1;
        this.speed = 0;
        this.switchSprite("Idle");
      }
    }

    if (!this.onFloor()) {
      this.switchSprite("Run");
      this.yVertical += this.gravity;

      if (this.key === "Control" && !this.isWinner) this.switchSprite("Attack");
    } else {
      this.yVertical = 0;
    }

    if (this.position.yPosition >= CANVAS_HEIGHT - this.heightImg - 50) this.position.yPosition = CANVAS_HEIGHT - this.heightImg - 50;

    if (this.position.xPosition <= 0) this.position.xPosition = 0;

    if (this.position.xPosition >= CANVAS_WIDTH - this.widthImg) this.position.xPosition = CANVAS_WIDTH - this.widthImg;
  }

  onFloor() {
    return this.position.yPosition >= CANVAS_HEIGHT - this.heightImg - 50;
  }

  dead() {
    if (this.lives === 0) {
      this.switchSprite("Fire");
      this.isDead = true;
    }
  }
}
