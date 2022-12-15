class SpiritBombs {
  constructor(ctx, xPosition, yPosition) {
    this.ctx = ctx;

    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.widthBomb = 50;
    this.heigthBomb = 50;
    this.xVelocity = 10;

    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.isSpiritBombCollided = false;
  }

  bombAnimations() {
    this.draw();
    this.animateFrames();
  }

  draw() {
    this.image.src = PLAYERDB[4].src;
    this.ctx.drawImage(
      this.image,
      PLAYERDB[4].initialFrame * PLAYERDB[4].width,
      0,
      PLAYERDB[4].width,
      PLAYERDB[4].height,
      this.xPosition,
      this.yPosition,
      PLAYERDB[4].width,
      PLAYERDB[4].height
    );
  }

  animateFrames() {
    if (this.gameFrame % PLAYERDB[4].stepFrames === 0) {
      if (PLAYERDB[4].initialFrame <= this.finalFrames) PLAYERDB[4].initialFrame = PLAYERDB[4].frameReset;

      PLAYERDB[4].initialFrame--;
    }
    this.gameFrame++;
  }

  move() {
    this.xPosition += this.xVelocity;
    if (this.xPosition > CANVAS_WIDTH) this.isSpiritBombCollided = true;
  }
}
