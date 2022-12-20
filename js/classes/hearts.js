import { CANVAS_WIDTH } from "../utils/constants.js";
import { Sprite } from "./sprite.js";

export class Hearts extends Sprite {
  constructor(ctx) {
    super(ctx);

    this.xPosition = CANVAS_WIDTH - 175;
    this.yPosition = 10;
    this.width = 168;
    this.height = 28.5;
    this.yFrame = 0;
  }

  draw(lives) {
    const image = "../../src/img/player/hearts.png";
    switch (lives) {
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
    super.draw(image, 0, this.yFrame, this.width, this.height, this.xPosition, this.yPosition, this.width, this.height);
  }
}
