import { BGROUNDDB } from "../utils/bgroundDB.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CTX } from "../utils/constants.js";

export class Background {
  constructor() {
    this.states = BGROUNDDB;
    this.backGrounds = BGROUNDDB;
    this.imageFix = new Image();
    this.imageFix.src = "../../src/img/background/sky.png";
  }
  draw() {
    CTX.drawImage(this.imageFix, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.backGrounds.forEach((state) => {
      state.image.src = state.src;

      let image2 = state.image;

      CTX.drawImage(state.image, state.xPosition, state.yPosition);

      if (state.infinity) CTX.drawImage(image2, state.xPosition2, state.yPosition);
    });
    this.animate();
  }

  animate() {
    this.backGrounds.forEach((state) => {
      if (state.right) {
        state.xPosition += state.speed;

        state.xPosition2 += state.speed;

        if (state.xPosition >= state.width) state.xPosition = -state.width + state.xPosition2 - state.speed;

        if (state.xPosition2 >= state.width) state.xPosition2 = -state.width + state.xPosition - state.speed;
      } else {
        state.xPosition -= state.speed;
        if (state.xPosition <= -state.width) state.xPosition = state.width + state.xPosition2 - state.speed;

        if (state.infinity) {
          state.xPosition2 -= state.speed;

          if (state.xPosition2 <= -state.width) state.xPosition2 = state.width + state.xPosition - state.speed;
        }
        if (!state.infinity && state.xPosition <= -state.width) state.xPosition = CANVAS_WIDTH;
      }
    });
  }
}
