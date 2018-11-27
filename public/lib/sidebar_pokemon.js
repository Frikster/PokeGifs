const Util = require("./util");
import Pokemon from "./pokemon";

class SidebarPokemon extends Pokemon {
  constructor(options) {
    options.radius = SidebarPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options)
    this.offsets = [0,0];
    this.starting_pos = options.pos.slice(0);
    this.isDragging = false;
  }

  translationOffset(offsetX, offsetY) {
    this.offsets = [offsetX, offsetY];
    this.pos[0] = this.starting_pos[0] + offsetX;
    this.pos[1] = this.starting_pos[1] + offsetY;
    console.log(this.pos[0]);
  }

}

SidebarPokemon.RADIUS = 15;
export default SidebarPokemon;