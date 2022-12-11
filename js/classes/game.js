class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    // this.player = new Chars(ctx);
    this.x = 0;
    this.y = 0;

    //Background
    this.sizeBg = 1865;
    this.sizeMoon = 300;
    this.bgSpeed = 1;
    this.imgSrc1 = "../../src/img/moon.png";
    this.moon = new Background(ctx, CANVAS_WIDTH, 0, this.imgSrc1, this.bgSpeed * 0.05, null, this.sizeMoon, false);
    this.imgSrc2 = "../../src/img/background3.png";
    this.bg1 = new Background(ctx, 0, 0, this.imgSrc2, this.bgSpeed * 0.1, this.sizeBg, this.sizeBg, true);
    this.imgSrc3 = "../../src/img/background2.png";
    this.bg2 = new Background(ctx, 0, 0, this.imgSrc3, this.bgSpeed * 0.3, this.sizeBg, this.sizeBg, true);
    this.imgSrc4 = "../../src/img/clouds.png";
    this.clouds = new Background(ctx, 0, 0, this.imgSrc4, this.bgSpeed * 0.1, this.sizeBg, this.sizeBg, true);
    this.imgSrc5 = "../../src/img/background1.png";
    this.bg3 = new Background(ctx, 0, 0, this.imgSrc5, this.bgSpeed * 0.5, this.sizeBg, this.sizeBg, true);
    this.imgSrc6 = "../../src/img/floor.png";
    this.floor = new Background(ctx, 0, CANVAS_HEIGHT - 70, this.imgSrc6, this.bgSpeed * 0.8, this.sizeBg, this.sizeBg, true);
    this.decorations = [this.moon, this.bg1, this.clouds, this.bg2, this.bg3, this.floor];
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
    }, 1000 / 60);
  }

  draw() {
    this.decorations.forEach((decoration) => {
      decoration.draw();
      decoration.animate();
    });
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  pause() {}

  addObstacles() {}

  checkCollisions() {}

  gameOver() {}
}
