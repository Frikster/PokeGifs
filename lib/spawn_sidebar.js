import SidebarPokemon from './sidebar_pokemon'
const Util = require("./util");

class SpawnSidebar {
    constructor(topLeftCoords) {
        this.untranslatedTopLeftCoords = topLeftCoords.slice(0);
        this.topLeftCoords = topLeftCoords;
        this.width = SidebarPokemon.RADIUS * 4;
        this.pokeX = topLeftCoords[0] + (this.width / 2);
        this.ySpacing = SidebarPokemon.RADIUS * 3;
        this.firstPokeYPosition = topLeftCoords[1] + this.ySpacing;
        this.pokemon = [];
        this.generateRandomPokemon();
        this.height = SpawnSidebar.NUM_POKEMON * SidebarPokemon.RADIUS * 3;
        setInterval(this.generateRandomPokemon.bind(this), 5000);
    }

    generateRandomPokemon() {
        const randomIds = []
        for(let i = 0; i < 5; i++){
            let pokeId = (Math.floor(Math.random() * 649) + 1).toString();
            randomIds.push(pokeId);
        }

        for (let i = 0; i < SpawnSidebar.NUM_POKEMON; i++) {
            let newPoke = new SidebarPokemon({
                pos: [this.pokeX, this.firstPokeYPosition + (i * this.ySpacing)],
                imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[i]}.png`,
                imgId: randomIds[i]
            });
            if (this.pokemon.length != SpawnSidebar.NUM_POKEMON) {
                this.pokemon.push(newPoke);
            } else if(!this.pokemon[i].isDragging) {
                this.pokemon[i] = newPoke;
            }
        }
        
        // if(this.pokemon) {


        //     this.pokemon.forEach(poke => {
        //         if(poke.isDragging) {continue}

        //     })
        // } else {
        //     this.pokemon = [new SidebarPokemon({
        //         pos: [this.pokeX, this.firstPokeYPosition],
        //         imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[0]}.png`,
        //         imgId: randomIds[0]
        //     }), new SidebarPokemon({
        //         pos: [this.pokeX, this.firstPokeYPosition + this.ySpacing],
        //         imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[1]}.png`,
        //         imgId: randomIds[1]
        //     }), new SidebarPokemon({
        //         pos: [
        //             this.pokeX,
        //             this.firstPokeYPosition + 2 * this.ySpacing
        //         ],
        //         imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[2]}.png`,
        //         imgId: randomIds[2]
        //     }), new SidebarPokemon({
        //         pos: [
        //             this.pokeX,
        //             this.firstPokeYPosition + 3 * this.ySpacing
        //         ],
        //         imgSrc: `https://sprites.pokecheck.org/icon/${randomIds[3]}.png`,
        //         imgId: randomIds[3]
        //     }), ];
        // }
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

    translationOffset(offsetX, offsetY) {
        this.topLeftCoords[0] = this.untranslatedTopLeftCoords[0] + offsetX;
        this.topLeftCoords[1] = this.untranslatedTopLeftCoords[1] + offsetY;
        this.pokemon.forEach(poke => {
            poke.translationOffset(offsetX, offsetY);
        });
    }

    updateDraggedPoke(pos) {
        this.pokemon.filter(poke => poke.isDragging)[0].pos = pos;
    }

}
SpawnSidebar.NUM_POKEMON = 3;
export default SpawnSidebar;