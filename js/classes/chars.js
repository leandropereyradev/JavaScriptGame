class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 60;
    this.y = 0;
    this.width = 60;
    this.height = 90;
    this.y0 = CANVAS_HEIGHT - 140;
    this.key = "";
    this.initialState = 0;
    this.state = () => this.initialState;
    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.xVelocity = 5;
  }

  charAnimations() {
    this.draw();
    this.animateFrames();
    this.movement();
  }

  draw() {
    this.image.src = PLAYERDB[this.state()].src;
    this.ctx.drawImage(
      this.image,
      PLAYERDB[this.state()].initialFrame * PLAYERDB[this.state()].width,
      0,
      PLAYERDB[this.state()].width,
      PLAYERDB[this.state()].height,
      this.x,
      this.y0,
      PLAYERDB[this.state()].width,
      PLAYERDB[this.state()].height
    );
  }

  animateFrames() {
    if (this.gameFrame % PLAYERDB[this.state()].stepFrames === 0) {
      if (PLAYERDB[this.state()].initialFrame <= this.finalFrames) PLAYERDB[this.state()].initialFrame = PLAYERDB[this.state()].frameReset;

      PLAYERDB[this.state()].initialFrame--;
    }
    this.gameFrame++;
  }

  movement() {
    switch (this.key) {
      case "ArrowRight":
        this.initialState = 1;
        this.x += this.xVelocity;
        break;
      case "ArrowLeft":
        this.initialState = 1;
        this.x -= this.xVelocity;
        break;
      case "Control":
        this.initialState = 2;
        setTimeout(() => {
          this.key = "";
        }, 200);
        break;
      case "":
        this.initialState = 0;
        break;
    }
  }

  run() {}

  takeHits() {}

  dead() {}
}
