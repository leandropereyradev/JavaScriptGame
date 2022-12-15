class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 60;
    this.y = CANVAS_HEIGHT - 140;
    this.width = 60;
    this.height = 90;
    this.key = "";
    this.initialState = 0;
    this.state = () => this.initialState;
    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;

    this.lives = 5;

    this.xVelocity = 5;
    this.speed = 0;
    this.yVertical = 1;
    this.gravity = 1;
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
      this.y,
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
        this.speed = 5;
        break;
      case "ArrowLeft":
        this.initialState = 1;
        this.speed = -5;
        break;
      case "Control":
        this.initialState = 2;
        setTimeout(() => {
          this.key = "";
        }, 200);
        break;
      case " ":
        if (this.onFloor()) {
          this.initialState = 0;
          this.yVertical = -20;
        }
        break;
      case "":
        this.initialState = 0;
        this.speed = 0;
        break;
    }

    this.x += this.speed;
    this.y += this.yVertical;

    if (!this.onFloor()) {
      this.yVertical += this.gravity;
    } else {
      this.yVertical = 0;
    }

    if (this.y >= CANVAS_HEIGHT - 140) {
      this.y = CANVAS_HEIGHT - 140;
    }
  }

  onFloor() {
    return this.y >= CANVAS_HEIGHT - 140;
  }

  takeHits() {}

  dead() {}
}
