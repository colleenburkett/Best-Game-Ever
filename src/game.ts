import { Ball } from './objects/ball';
import { Canvas } from './objects/canvas';

export class Game {

  canvas: Canvas;
  balls: Ball[] = [];
  ballLimit = 160;
  fps = 60;
  frameRate = 1000 / this.fps;

  constructor() {
    this.canvas = new Canvas();
    for (let i = 0; i < this.ballLimit; i++) {
      this.balls.push(Ball.randomBall());
    }

  }

  setupCanvas(): HTMLCanvasElement {
    return this.canvas.canvasElement;
  }

  // Entry for the game
  start() {
    console.log('Starting Game');
    this.run();
  }

  run() {
    setTimeout(() => {
      this.run();
    }, this.frameRate)
    this.update();
    this.draw();
  }

  // ------------------- Updating/Mutation methods --------------------------
  update() {
    this.balls.forEach((ball: Ball) => {
      ball.update(this.balls);
    });

    // this.balls[0].update(this.balls[1]);
    // this.balls[1].update(this.balls[0]);
  }

  // ------------------- Drawing/Animation methods --------------------------
  clearRect() {
    this.canvas.ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  draw(): void {
    this.clearRect();

    this.balls.forEach((ball: Ball) => {
      ball.draw(this.canvas.ctx);
    });
  }

}