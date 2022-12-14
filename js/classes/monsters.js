class Monsters {
  constructor(ctx) {
    this.ctx = ctx;
    this.yFloor = CANVAS_HEIGHT - 140;
    this.xPosition = CANVAS_WIDTH;
    this.width = 40;
    this.height = 90;
    this.isMonsterOut = false;
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.xPosition, this.yFloor, this.width, this.height);
  }

  movement() {
    this.xPosition--;
    if (this.xPosition < 0) this.isMonsterOut = true;
  }
}
