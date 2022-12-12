class Chars {
  constructor(ctx) {
    this.ctx = ctx;
    this.key = [];
    this.x = 60;
    this.y = CANVAS_HEIGHT - 140;
    this.width = 101;
    this.height = 96;
    this.image = new Image();
    this.image.src = "../../src/img/player_takeHits.png";
    this.initialFrameX = 7;
    this.finalFrames = 0;
    this.gameFrame = 0;
  }
  draw() {
    this.takeHits();
  }

  attack() {
    // width: 115, height: 93, stepFrames: 6
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 6;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 11;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

  idle() {
    // width: 67, height: 93, stepFrames: 9
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 9;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 6;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

  run() {
    // width: 77, height: 81, stepFrames: 7
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 7;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 6;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

  shoot() {
    // width: 116, height: 108, stepFrames: 10
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 10;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 2;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }
  bomb() {
    // width: 122, height: 134, stepFrames: 6
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 6;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 7;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

  takeHits() {
    // width: 101, height: 96, stepFrames: 5
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 5;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 7;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

  dead() {
    // width: 122, height: 96, stepFrames: 8
    this.ctx.drawImage(this.image, this.initialFrameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

    const stepFrames = 8;
    if (this.gameFrame % stepFrames === 0) {
      if (this.initialFrameX <= this.finalFrames) this.initialFrameX = 8;
      this.initialFrameX--;
    }
    this.gameFrame++;
  }

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
            this.key.push(event.key);
            break;
        }
        break;
      case "keyup":
        switch (event.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Control":
          case " ":
            this.key.splice(event.key);
            break;
        }
        break;
    }
    // console.log(this.key);
    // console.log(event.key);
  }
}
