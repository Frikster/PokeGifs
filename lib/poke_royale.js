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


import Board from "./board";
import * as UI from "./ui"

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

  canvasEl.addEventListener("mousedown", function(e){
    board.handleLeftMouseClick.bind(board)(e)
    this.onmousemove = function(e) {
        board.handleMouseDownAndMouseMove.bind(board)(e);
     }
    // this.addEventListener("mousemove", board.handleMouseDownAndMouseMove.bind(board));
  });
  canvasEl.addEventListener("mouseup", function(e){
      board.handleMouseUp.bind(board)(e);
      this.onmousemove = null;
      // this.removeEventListener("mousemove", board.handleMouseDownAndMouseMove);
  });
  canvasEl.addEventListener('click', function(e){
    this.onmousemove = null;
    board.handleLeftMouseClick.bind(board)(e);},
    false);
  canvasEl.addEventListener('contextmenu', function(e){
    this.onmousemove = null;
    board.handleRightMouseClick.bind(board)(e);
  }, false);

  window.ctx = ctx;
});


