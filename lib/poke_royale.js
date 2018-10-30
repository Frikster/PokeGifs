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


const Board = require("./board");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Board.DIM_X;
  canvasEl.height = Board.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const board = new Board(ctx);
  board.start();

  // Needs to be deleted later as User chooses either fire/water/grass at start
  board.addPlayerPokemon([100,100])
  board.addPlayerPokemon([200,200])

  canvasEl.addEventListener('click', board.handleLeftMouseClick.bind(board), false);
  canvasEl.addEventListener('contextmenu', board.handleRightMouseClick.bind(board), false);
  
  // const game = new Game();
  // canvasEl.addEventListener('click', clickReporter, false);
  // new GameView(game, ctx).start();
});
