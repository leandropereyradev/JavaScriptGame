export class Sprite {
  constructor(ctx) {
    this.ctx = ctx;
    this.image = new Image();
  }

  draw(imgSrc, widthSprite, width, height, xPosition, yPosition, widthSize, heightSize) {
    this.image.src = imgSrc;
    this.ctx.drawImage(this.image, widthSprite, 0, width, height, xPosition, yPosition, widthSize, heightSize);
  }

  animateFrames(gameFrame, stepFrames, initialFrame, finalFrames, frameReset) {
    if (gameFrame % stepFrames === 0) {
      if (initialFrame <= finalFrames) initialFrame = frameReset;

      initialFrame--;
      console.log(initialFrame);
    }
    gameFrame < 100 ? gameFrame++ : (gameFrame = 0);
    console.log(gameFrame)
  }
}
