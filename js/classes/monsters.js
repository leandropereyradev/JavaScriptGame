import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/constants.js";
import { MONSTERDB } from "../utils/monsterDB.js";
import { Sprite } from "./sprite.js";

export class Monsters extends Sprite {
  constructor(ctx, randomStop) {
    super(ctx);
    this.xPosition = CANVAS_WIDTH;
    this.yPosition = () => CANVAS_HEIGHT - this.distanceFloor;
    this.distanceFloor = 175;
    this.width = 60;
    this.height = 0;

    this.gameFrame = 0;
    this.finalFrames = 0;
    this.initialState = 0;

    this.isMonsterOut = false;
    this.isMonsterKilled = false;
    this.isNotAttacking = false;

    this.speed = 0.3;
    this.lives = 3;
    this.stop = 1;
    this.walk = 1;
    this.randomStop = randomStop;
    this.stoped = false;
  }

  draw() {
    this.height = MONSTERDB[this.initialState].height;

    super.draw(
      MONSTERDB[this.initialState].src,
      MONSTERDB[this.initialState].initialFrame * MONSTERDB[this.initialState].width,
      MONSTERDB[this.initialState].width,
      MONSTERDB[this.initialState].height,
      this.xPosition,
      this.yPosition(),
      MONSTERDB[this.initialState].widthSize,
      MONSTERDB[this.initialState].heightSize
    );
  }

  animateFrames() {
    // super.animateFrames(0, PLAYERDB[this.state()].stepFrames, PLAYERDB[this.state()].initialFrame, 0, PLAYERDB[this.state()].frameReset);

    if (this.gameFrame % MONSTERDB[this.initialState].stepFrames === 0) {
      if (MONSTERDB[this.initialState].initialFrame <= this.finalFrames)
        MONSTERDB[this.initialState].initialFrame = MONSTERDB[this.initialState].frameReset;

      MONSTERDB[this.initialState].initialFrame--;
      // console.log(PLAYERDB[this.state()].initialFrame)
    }
    this.gameFrame < 100 ? this.gameFrame++ : (this.gameFrame = 0);
  }

  movement() {
    if (this.xPosition === -this.width) this.isMonsterOut = true;

    if (this.stop > this.randomStop && !this.stoped) {
      this.stoped = true;
      this.speed = 0;
      this.distanceFloor = 190;
      this.initialState = 3;
      this.isNotAttacking = true;

      setTimeout(() => {
        this.isNotAttacking = false;
        this.stop = 0;
        this.speed = 0.3;
        this.distanceFloor = 175;
        this.initialState = 0;
      }, 5000);
    }

    this.xPosition -= this.speed;
    this.stop++;
  }
}
