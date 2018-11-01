import SidebarPokemon from './sidebar_pokemon'
const Util = require("./util");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.topLeftCoords = topLeftCoords;
        this.width = SidebarPokemon.RADIUS * 4;

        this.pokeX = topLeftCoords[0] + (this.width / 2);
        this.ySpacing = SidebarPokemon.RADIUS * 3;
        this.firstPokeYPosition = topLeftCoords[1] + this.ySpacing;

        this.pokemon = [new SidebarPokemon({
            pos: [this.pokeX, this.firstPokeYPosition]
          }), new SidebarPokemon({
            pos: [this.pokeX, this.firstPokeYPosition + this.ySpacing]
          }), new SidebarPokemon({
                pos: [this.pokeX, this.firstPokeYPosition + (2*this.ySpacing)]
          }), new SidebarPokemon({
                pos: [this.pokeX, this.firstPokeYPosition + (3*this.ySpacing)]
          }), new SidebarPokemon({ pos: [] })];
        this.height = this.pokemon.length * SidebarPokemon.RADIUS * 3;
    }

    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(this.topLeftCoords[0], this.topLeftCoords[1], this.width, this.height);

        this.pokemon.forEach(poke => {
            poke.draw(ctx);
        });
    }

    updateDraggedPoke(pos) {
        this.pokemon.filter(poke => poke.isDragging)[0].pos = pos;
    }

    
}

export default SpawnSidebar;