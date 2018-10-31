import SidebarPokemon from './sidebar_pokemon'
const Util = require("./util");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.topLeftCoords = topLeftCoords;
        this.width = SidebarPokemon.RADIUS * 4;
        this.pokemon = [new SidebarPokemon(), new SidebarPokemon(), new SidebarPokemon(), new SidebarPokemon(), new SidebarPokemon()];
        this.height = this.pokemon.length * SidebarPokemon.RADIUS * 3;
    }

    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.topLeftCoords[0], this.topLeftCoords[1], this.width, this.height);

        
    }
}

export default SpawnSidebar;