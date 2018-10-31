const Pokemon = require("./pokemon");
const Util = require("./util");

class PlayerPokemon extends Pokemon {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options);
    this.selected = false;
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
module.exports = PlayerPokemon;
