export class Sprite {
  constructor(ctx) {
    this.ctx = ctx;
    this.image = new Image();

    this.finalFrames = 0;
    this.gameFrame = 0;
  }

  draw(imgSrc, xSprite, ySprite, width, height, xPosition, yPosition, widthSize, heightSize) {
    this.image.src = imgSrc;
    this.ctx.drawImage(this.image, xSprite, ySprite, width, height, xPosition, yPosition, widthSize, heightSize);
  }

  animateFrames(stepFrames, initialFrame, frameReset) {
    if (this.gameFrame % stepFrames === 0) {
      if (initialFrame <= this.finalFrames) initialFrame = frameReset;

      initialFrame--;
    }
    this.gameFrame < 100 ? this.gameFrame++ : (this.gameFrame = 0);
  }
}
