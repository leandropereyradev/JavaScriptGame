import { CANVAS_WIDTH } from "../utils/constants.js";

export class Background {
  constructor(ctx, x, y, imgSrc, backgroundSpeed, x2, width, infinity, right = false, controled= false) {
    this.ctx = ctx;
    this.x = x;
    this.x2 = x2;
    this.y = y;
    this.width = width;

    this.image = new Image();
    this.image.src = imgSrc;
    this.image2 = this.image;

    this.backgroundSpeed = backgroundSpeed;
    this.infinity = infinity;
    this.right = right;
    this.controled = controled
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y);

    if (this.infinity) {
      this.ctx.drawImage(this.image2, this.x2, this.y);
    }
  }

  animate() {
    if (this.right) {
      this.x += this.backgroundSpeed;

      if (this.infinity) {
        this.x2 += this.backgroundSpeed;

        if (this.x >= this.width) this.x = -this.width + this.x2 - this.backgroundSpeed;

        if (this.x2 >= this.width) this.x2 = -this.width + this.x - this.backgroundSpeed;
      }
    } else {
      this.x -= this.backgroundSpeed;

      if (this.infinity) {
        this.x2 -= this.backgroundSpeed;

        if (this.x <= -this.width) this.x = this.width + this.x2 - this.backgroundSpeed;

        if (this.x2 <= -this.width) this.x2 = this.width + this.x - this.backgroundSpeed;
      }
      if (!this.infinity && this.x <= -this.width) this.x = CANVAS_WIDTH;
    }
  }
}
