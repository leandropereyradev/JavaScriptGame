class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.interval = null;

    this.player = new Chars(ctx);
    this.spiritBombs = [];

    this.monsters = [];
    this.monstersKilled = 0;
    this.tickMonster = 60 * 5;

    this.bats = [];
    this.batFreed = 0;
    this.tickBat = 60;

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

      this.spiritBombs.forEach((bomb) => {
        bomb.bombAnimations();
        bomb.move();
        this.spiritBombInfo = bomb.xPosition + 0.5;
      });
      this.spiritBombs = this.spiritBombs.filter((bomb) => !bomb.isSpiritBombCollided);

      this.checkCollisionsMonsters();

      this.monstersAppears();
      this.checkBombAndMonster();

      this.batsAppears();
      this.checkBombAndBat();

      this.monsters.forEach((monster) => {
        monster.movement();
      });

      this.bats.forEach((bat) => {
        bat.movement();
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

    this.bats.forEach((bat) => {
      bat.draw();
    });

    this.displayStatus();
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  playerAttack() {
    const x = this.player.x;
    const y = this.player.y0 - 20;
    const spiritBomb = new SpiritBombs(this.ctx, x, y);
    this.spiritBombs.push(spiritBomb);
  }

  monstersAppears() {
    this.tickMonster--;

    if (this.tickMonster <= 0) {
      this.tickMonster = Math.floor(Math.random() * 1500) + 200;
      const monster = new Monsters(this.ctx);
      this.monsters.push(monster);
    }

    this.monsters.forEach((monster) => {
      if (monster.xPosition === -monster.width) monster.isMonsterOut = true;
    });

    this.monsters = this.monsters.filter((monster) => !monster.isMonsterOut);
  }

  batsAppears() {
    this.tickBat--;

    if (this.tickBat <= 0) {
      this.tickBat = Math.floor(Math.random() * 800) + 300;

      const bat = new Bats(this.ctx);
      this.bats.push(bat);
    }
    this.bats.forEach((bat) => {
      if (bat.xPosition === -bat.width) bat.isBatOut = true;
    });

    this.bats = this.bats.filter((bat) => bat.isBatOut === false);
  }

  pause() {}

  checkCollisionsMonsters() {
    this.monsters.forEach((monster) => {
      const colX = this.player.x + this.player.width >= monster.xPosition && monster.xPosition + monster.width >= this.player.x;
      const colY = monster.yFloor + monster.height >= this.player.y && monster.yFloor <= this.player.y + this.player.height;

      if (colX || colY) {
        //Todo: Implementar que al chocar empuje al jugador y reste punto y vida
      }
    });
  }

  checkBombAndMonster() {
    this.spiritBombs.forEach((bomb) => {
      this.monsters.forEach((monster) => {
        if (monster.xPosition <= bomb.xPosition + 50 && monster.xPosition + monster.width >= bomb.xPosition) {
          monster.isMonsterKilled = true;
          bomb.isSpiritBombCollided = true;
          this.monstersKilled += 1;
        }
        this.monsters = this.monsters.filter((monster) => !monster.isMonsterKilled);
      });
    });
  }

  checkBombAndBat() {
    this.spiritBombs.forEach((bomb) => {
      this.bats.forEach((bat) => {
        if (bat.xPosition <= bomb.xPosition + 50 && bat.xPosition + bat.width >= bomb.xPosition) {
          bat.isBatKilled = true;
          bomb.isSpiritBombCollided = true;
          this.batFreed += 1;
        }
        this.bats = this.bats.filter((bat) => !bat.isBatKilled);
      });
    });
  }

  displayStatus() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Helvetica";
    this.ctx.fillText("Monsters Killed: " + this.monstersKilled, 20, 50);
    this.ctx.fillText("Bats Freed: " + this.batFreed, 20, 110);
  }

  gameOver() {}

  onKeyEvent(event) {
    if (event) {
      switch (event.type) {
        case "keydown":
          switch (event.key) {
            case "ArrowLeft":
              this.player.key = event.key;
              break;
            case "ArrowRight":
              this.player.key = event.key;
              break;
            case "Control":
              this.player.key = event.key;
              break;
          }
          break;
        case "keyup":
          switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
              this.player.key = "";
              break;
            case "Control":
              this.playerAttack();
          }
          break;
      }
    }
  }
}
