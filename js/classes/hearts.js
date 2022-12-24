import { CANVAS_WIDTH } from "../utils/constants.js";
import { PLAYERDBR } from "../utils/playerDB.js";
import { Sprite } from "./sprite.js";

export class Hearts extends Sprite {
  constructor() {
    super();
    this.position = {
      xPosition: CANVAS_WIDTH - 175,
      yPosition: 10,
    };

    this.yFrame = 0;

    this.image.src = PLAYERDBR.Heart.image;
    this.scale = PLAYERDBR.Heart.scale;
    this.totalFrames = PLAYERDBR.Heart.totalFrames;
    this.frameBuffer = PLAYERDBR.Heart.frameBuffer;
    this.loop = false;

    this.image.height = 28.5;
  }

  draw(lives) {
    switch (lives) {
      case 10:
        this.yFrame = 0;
        break;
      case 9:
        this.yFrame = 28;
        break;
      case 8:
        this.yFrame = 55;
        break;
      case 7:
        this.yFrame = 83;
        break;
      case 6:
        this.yFrame = 110;
        break;
      case 5:
        this.yFrame = 137;
        break;
      case 4:
        this.yFrame = 164;
        break;
      case 3:
        this.yFrame = 191;
        break;
      case 2:
        this.yFrame = 218;
        break;
      case 1:
        this.yFrame = 244;
        break;
      case 0:
        this.yFrame = 272;
        break;
    }
    super.draw();
  }
}
