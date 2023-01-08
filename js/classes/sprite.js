import { CTX } from "../utils/constants.js";

export class Sprite {
  constructor(position, states, totalFrames, frameBuffer, scale, loop, yFrame = 0) {
    this.position = position;

    this.states = states;
    this.totalFrames = totalFrames;
    this.scale = scale;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.loop = loop;
    this.yFrame = yFrame;

    this.image = new Image();
    this.image.onload = () => {
      this.widthImg = this.image.width / this.totalFrames;
      this.heightImg = this.image.height;
    };
  }

  draw() {
    if (!this.image) return;

    const cropBox = {
      position: {
        x: this.currentFrame * this.widthImg,
        y: this.yFrame,
      },
      width: this.widthImg,
      height: this.image.height,
    };

    CTX.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.xPosition,
      this.position.yPosition,
      this.widthImg * this.scale,
      this.heightImg * this.scale
    );

    this.animateFrames();
  }

  animateFrames() {
    this.elapsedFrames <= 200 ? this.elapsedFrames++ : (this.elapsedFrames = 0);

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.totalFrames - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }
  }

  switchSprite(name) {
    if (this.image.src === this.states[name].image) return;

    this.image.src = this.states[name].image;
    this.scale = this.states[name].scale ? this.states[name].scale : 1;
    this.totalFrames = this.states[name].totalFrames ? this.states[name].totalFrames : 1;
    this.frameBuffer = this.states[name].frameBuffer ? this.states[name].frameBuffer : 1;
    this.loop = this.states[name].loop ? this.states[name].loop : true;
  }
}
