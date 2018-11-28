import Pokemon from "./pokemon";
const Util = require("./util");

class PlayerPokemon extends Pokemon {
  constructor(options) {
    options.radius = PlayerPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    let id = options.imgId;
    if(id.length === 1) { id = '00' + id}
    if (id.length === 2) { id = '0' + id }
    options.imgSrc = options.imgSrc.replace(options.imgId, id);
    options.imgSrcBack = options.imgSrcBack.replace(options.imgId, id);
    options.imgId = id + '_' + Math.random().toString(36).substring(2)
      + (new Date()).getTime().toString(36); // Make Id unique

    super(options);
    this.selected = options.selected || false;
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

PlayerPokemon.RADIUS = 15;
export default PlayerPokemon;
