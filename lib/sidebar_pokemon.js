class SidebarPokemon extends Pokemon {
  constructor(options) {
    options.radius = SidebarPokemon.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || Util.randomColor();
    super(options)
    this.selected = false;
  }



}

SidebarPokemon.RADIUS = 15;
export default SidebarPokemon;