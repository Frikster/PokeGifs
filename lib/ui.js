const Util = require("./util"); 

class SelectorRectangle {
    constructor(startCoords, endCoords) {
        this.startCoords = startCoords; 
        this.endCoords = endCoords; 
        this.thirdCoord = [this.startCoords[0],this.endCoords[1]]
        this.defineRect = [
            this.startCoords[0],
             this.startCoords[1],
              this.endCoords[0],
               this.endCoords[1],
               this.thirdCoord[0],
               this.thirdCoord[1]];
    }

    setEndCoords(coords) {
        this.endCoords = coords;
    }

    // inSelectRectangle(coords) {
    //     return Util.inRect(coords, this.defineRect));
    // }

    draw(ctx) {
        // ctx.fillStyle = 'black';
        // ctx.fillRect(100,100,200,200);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        const x = this.endCoords[0] - this.startCoords[0];
        const y = this.endCoords[1] - this.startCoords[1];
        ctx.strokeRect(this.startCoords[0],this.startCoords[1],x,y);

        // ctx.rect(this.topleft[0],this.topleft[1],this.bottomRight[0],this.bottomRight[1]);
        // ctx.stroke();
    }


}

export {SelectorRectangle};