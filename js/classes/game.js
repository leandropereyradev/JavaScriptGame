class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.interval = null;
    this.player = new Chars(ctx);
    this.monsters = [];
    this.tick = 60 * 5;

    //Background
    this.imgBackground = new Image();
    this.imgBackground.src = "../../src/img/bd_space_seamless_fl1.png";
    this.sizeBg = 1865;
    this.sizeMoon = 300;
    this.bgSpeed = 1;
    this.imgSrc1 = "../../src/img/moon.png";
    this.moon = new Background(ctx, CANVAS_WIDTH, 0, this.imgSrc1, this.bgSpeed * 0.07, null, this.sizeMoon, false);
    this.imgSrc2 = "../../src/img/background3.png";
    this.bg1 = new Background(ctx, 0, 30, this.imgSrc2, this.bgSpeed * 0.1, this.sizeBg, this.sizeBg, true);
    this.imgSrc3 = "../../src/img/background2.png";
    this.bg2 = new Background(ctx, 0, 40, this.imgSrc3, this.bgSpeed * 0.3, this.sizeBg, this.sizeBg, true);
    this.imgSrc4 = "../../src/img/clouds.png";
    this.clouds = new Background(ctx, 0, 60, this.imgSrc4, this.bgSpeed * 0.8, this.sizeBg, this.sizeBg, true, true);
    this.imgSrc4b = "../../src/img/clouds.png";
    this.clouds2 = new Background(ctx, 400, 250, this.imgSrc4b, this.bgSpeed * 0.1, this.sizeBg, this.sizeBg, true, true);
    this.imgSrc5 = "../../src/img/background1.png";
    this.bg3 = new Background(ctx, 0, 56, this.imgSrc5, this.bgSpeed * 0.5, this.sizeBg, this.sizeBg, true);
    this.imgSrc6 = "../../src/img/floor.png";
    this.floor = new Background(ctx, 0, CANVAS_HEIGHT - 60, this.imgSrc6, this.bgSpeed * 0.8, this.sizeBg, this.sizeBg, true);
    this.decorations = [this.moon, this.bg1, this.clouds, this.bg2, this.clouds2, this.bg3, this.floor];
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.player.charAnimations();
      this.monstersAppears();
      this.monsters.forEach((monster) => {
        monster.movement();
      });
    }, 1000 / 60);
  }

  draw() {
    this.ctx.drawImage(this.imgBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.decorations.forEach((decoration) => {
      decoration.draw();
      decoration.animate();
    });
    this.monsters.forEach((monster) => monster.draw());
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  monstersAppears() {
    this.tick--;

    if (this.tick <= 0) {
      this.tick = Math.floor(Math.random() * 1500);
      const monster = new Monsters(this.ctx);
      console.log(this.tick)
      this.monsters.push(monster);
    }
    this.monsters = this.monsters.filter((monster) => !monster.isMonsterOut);
  }

  pause() {}

  addObstacles() {}

  checkCollisions() {}

  gameOver() {}
}
