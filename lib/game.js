const Util = require("./util");
const PlayerPokemon = require("./player_pokemon");

class Game {
  constructor() {
    this.enemyPokemon = [];
    this.playerPokemon = [];

  }

  add(object) {
    if (object instanceof PlayerPokemon) {
      this.playerPokemon.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  addPlayerPokemon() {
    const playerPokemon = new PlayerPokemon({
      pos: this.randomPosition(),
      vel: [5,5],
      game: this
    });

    this.add(playerPokemon);
    return playerPokemon;
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  allObjects() {
    return [].concat(this.playerPokemon, this.enemyPokemon);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  step(delta) {
    // this.moveObjects(delta);
    // this.checkCollisions();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.BG_COLOR = "#28ba32";
Game.DIM_X = 1000;
Game.DIM_Y = 300;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;

// function Game(){
//   Game.prototype.DIM_X = 500;
//   Game.prototype.DIM_Y = 500;
//   this.asteroids = Game.prototype.addAsteroids();
// }

// Game.prototype.addAsteroids = function(){
//   let roidz = [];
//   for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
//     roidz.push(new Asteroid({pos: [Math.random(500) * 500, Math.random(500) * 500]}));
//   }
//   return roidz;
// };

// Game.prototype.draw = function(ctx) {
//   ctx.clearRect(0,0,500,500);
//   this.asteroids.forEach(function(roid) {
//     roid.draw(ctx);
//   });
// };
