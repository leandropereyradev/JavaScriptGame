class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 60;
    this.y = CANVAS_HEIGHT - 140;
    this.key = "";
    this.initialState = 0;
    this.state = () => this.initialState;
    this.image = new Image();
    this.finalFrames = 0;
    this.gameFrame = 0;
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
        this.x++;
        break;
      case "ArrowLeft":
        this.initialState = 1;
        this.x--;
        break;
      case "Control":
        this.initialState = 2;
        setTimeout(() => {
          this.initialState = 0;
          this.key = "";
        }, 1200);
        break;
      default:
        this.initialState = 0;
        break;
    }
  }

  attack() {}

  idle() {}

  run() {}

  takeHits() {}

  dead() {}

  onKeyEvent(event) {
    switch (event.type) {
      case "keydown":
        switch (event.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Control":
          case " ":
            this.key = event.key;
            break;
        }
        break;
      case "keyup":
        switch (event.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case " ":
            this.key = "";
            break;
        }
        break;
    }
  }
}
