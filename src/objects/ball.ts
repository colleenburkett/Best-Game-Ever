import {v4 as uuidv4 } from 'uuid';

import { Velocity } from "../interfaces/velocity";

export class Ball {

  id: string;
  radius: number;
  color: string;
  posX: number;
  posY: number;
  velocity: Velocity;
  angle: number; 
  speed: number;
  acceleration: number;
  mass: number;

  static randomBall() {
    
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'black' ];
    const ballSizeMin = 20;
    const ballSizeRange = 30;

    // let radius = Math.ceil(Math.random() * ballSizeRange) + ballSizeMin;
    let radius = 20;
    let color = colors[Math.floor(Math.random() * (colors.length))];
   
    let posX = Math.floor(Math.random() * (innerWidth - (2 * radius) )) + radius + 2;
    let posY = Math.floor(Math.random() * (innerHeight - (2 * radius))) + radius + 2;

    return new Ball(radius, color, posX, posY);
  }

  constructor(radius: number, color: string, posX: number, posY: number) {
    this.id = uuidv4()
    this.radius = radius;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.angle = Math.random() * 6;
    this.speed = 8;
    this.acceleration = 0.02;

    this.updateVelocity();
  }

  update(balls: Ball[]) { 
    
    this.checkForWallCollisionAndReverseDirectionIfNeeded();
    this.checkForBallCollisionAndChangeAngle(balls);
    this.updatePosition();
    
  }

  draw(ctx: CanvasRenderingContext2D) { 
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, true)
    ctx.fill();
  }

  updatePosition() {
    this.updateVelocity();
    this.posY += (this.velocity.dY);
    this.posX += (this.velocity.dX);
  }
  

  getSlope() {
    return this.velocity.dY / this.velocity.dX;
  }

  setVelocity(velocity: Velocity) {
    this.velocity = velocity
  }

  getAngle() {
    return Math.atan2(this.velocity.dY, this.velocity.dX );
  }

  setAngle(angle: number) {
    this.angle = angle
  }

  updateAngle() {
    this.angle = this.getAngle();
    this.updateVelocity();
  }

  setdY(dY: number) {
    this.velocity.dY = dY
  }

  setdX(dX: number) {
    this.velocity.dX = dX
  }

  getVelocity(): Velocity {
    const dX = Math.cos(this.angle) * this.speed;
    const dY = Math.sin(this.angle) * this.speed;
    return { dY, dX };
  }

  updateVelocity(): void {
    this.velocity = this.getVelocity();
  }
  
  changeSpeed(speed: number) {
    this.speed = speed;
  }
  
  changeDirection(dY: number, dX: number) {
    this.velocity.dY = dY;
    this.velocity.dX = dX;
  }
  
  checkForBallCollisionAndChangeAngle(balls: Ball[]) {
    for (const ball of balls) {
      if (this.id === ball.id) {
        continue
      };

      if (this.detectBallCollision(ball)) {
        this.collisionDirectionChange(ball);
      }
    }
  }


  checkForWallCollisionAndReverseDirectionIfNeeded() {
    if (this.touchingTopOrBottom()) {
      this.velocity.dY *= -1
    }
    if (this.touchingLeftOrRight()) {
      this.velocity.dX *= -1
    }
    this.updateAngle();
  }
  
  touchingTopOrBottom(): boolean {
    return this.posY - this.radius <= 0 || this.posY + this.radius >= innerHeight;
  }
  
  touchingLeftOrRight(): boolean {
    return this.posX - this.radius <= 0 || this.posX + this.radius >= innerWidth;
  }
  
  detectBallCollision(ball: Ball): boolean {
    return this.radius + ball.radius + 2 >= this.dist(ball);
  }
  
  dist(ball: Ball): number {
   return Math.sqrt((this.posY - ball.posY) ** 2 + (this.posX - ball.posX) ** 2);
  }  
  
  setCollisionAngle(ball: Ball) {
    this.angle = (this.angle + this.getCollisionAngle(ball)) / 2;
  }

  getCollisionAngle(ball: Ball): number {
    const dY = this.posY - ball.posY;
    const dX = this.posX - ball.posX;
    return Math.atan2(dY, dX);
  }

  collisionDirectionChange(ball: Ball) {

    this.setCollisionAngle(ball) 
    
    // if ((Math.ceil(this.posX - ball.posX) < (this.radius + ball.radius)) && (Math.ceil(this.posY - ball.posY) < (this.radius + ball.radius)))
    // {
      //   this..velocity.dX = -this..velocity.dX;
      //   this.velocity.dY = -this.velocity.dY;
      
      //   ball.dX = -ball.dX;
      //   ball.dY = -ball.dY;
      // }

    // const velocity = this.getVelocity(slope.dY)
    // const slopeVal = dY / dX;
    // const newDY = this.velocity.dY - ball.dY;
    
  }
}
