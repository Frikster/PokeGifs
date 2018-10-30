// const MovingObject = require("./moving_object.js");
// const Util = require("./util.js");
// const Game = require("./game.js");
// window.Game = Game;
// window.MovingObject = MovingObject;
// window.ctx = document.getElementById("game-canvas").getContext("2d");

// console.log("Webpack is working!");
// console.log("test!");

// function PokeRoyale(options) {
//   PokeRoyale.prototype.COLOR = 'pink';
//   PokeRoyale.prototype.RADIUS = 69; 
//   MovingObject.call(this, {pos: options.pos, color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
//   // const mo = new MovingObject({color: this.COLOR, radius: this.RADIUS, vel: Util.randomVec(this.RADIUS)});
// }
// // Asteroid.prototype.COLOR = 'pink';
// // Asteroid.prototype.RADIUS = 69; 

// Util.inherits(Asteroid, MovingObject);
// window.PokeRoyale = PokeRoyale;


const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});

