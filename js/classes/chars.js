class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 60;
    this.y = 0;
    this.width = 60
    this.height = 90
    this.y0 = CANVAS_HEIGHT - 140;
    this.key = "";
    this.initialState = 0;
    this.state = () => this.initialState;
    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.xVelocity = 5;

    this.spiritBombs = [];
  }

  charAnimations() {
    this.draw();
    this.animateFrames();
    this.movement();
    this.spiritBombs.forEach((bomb) => bomb.charAnimations());
    this.spiritBombs.forEach((bomb) => bomb.move());
    this.spiritBombs.filter((bomb) => {
      if (bomb.xPosition > CANVAS_WIDTH) this.spiritBombs.splice(bomb);
    });
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
        }, 1000);
        break;
      case "":
        this.initialState = 0;
        break;
    }
  }

  attack() {
    const x = this.x + PLAYERDB[this.state()].width / 2;
    const y = this.y0 - 20;
    const spiritBomb = new SpiritBombs(this.ctx, x, y);
    this.spiritBombs.push(spiritBomb);
  }

  idle() {}

  run() {}

  takeHits() {}

  dead() {}

  onKeyEvent(event) {
    if (event) {
      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "ArrowLeft":
              this.key = event.key;
              break;
            case "ArrowRight":
              this.key = event.key;
              break;
            case "Control":
              this.key = event.key;
              break;
          }
          break;
        case "keyup":
          switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
              this.key = "";
              break;
            case "Control":
              setTimeout(() => {
                this.attack();
              }, 500);
          }
          break;
      }
    }
  }
}
