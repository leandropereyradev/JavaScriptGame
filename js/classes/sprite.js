class Sprite {
  constructor(ctx, x, y, imgSrc) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imgSrc;
    this.image2 = this.image;
  }

  animateFrames() {}

  draw() {}
}
