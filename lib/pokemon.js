const Util = require("./util");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;
    // this.isSpriteSheet = options.isSpriteSheet;
    // this.image = new Image();
    // this.image.src = options.imageLocation;
    // this.spriteSize = options.spriteSize;
    // this.numberFrames = options.numberFrames;
    this.currentFrame = 0;

  }

  // doParse = function () {
  //   try {
  //     parseGIF(stream, handler);
  //   }
  //   catch (err) {
  //     doLoadError('parse');
  //   }
  // };

  loading_complete() {

  }

  draw(ctx) {
    if (!this.XMLHttpRequestData && !document.getElementById("charmander")) {
      var img = document.createElement("img");
      img.src = `https://sprites.pokecheck.org/bw/i/494.gif`;
      img.id = 'charmander'
      img.setAttribute("rel:animated_src", `https://sprites.pokecheck.org/bw/i/494.gif`);
      let div = document.getElementById("x");
      div.appendChild(img);

      img.onload = function () {
        var gifHeight = img.height;
        var gifWidth = img.width;

        // code here to use the dimensions
      }

      let gif = document.getElementById('charmander');
      let src = gif.getAttribute('rel:animated_src')



      // fetch(src).then(res => {
      //   debugger
      // });

      var h = new XMLHttpRequest();
      h.open('GET', src, true);
      this.loading_complete.bind(this);


      // h.onload = function (e) {
      //     debugger
      //     var XMLHttpRequestData = this.response;
      //   }
      
      h.onreadystatechange = function () {
        if (h.readyState == XMLHttpRequest.DONE) {
          this.XMLHttpRequestData = h.response;
        }
      }.bind(this)
      h.send();
    }
    if (this.XMLHttpRequestData) {debugger}

    // if (this.isSpriteSheet) {
    //   ctx.drawImage(this.image, 0, this.current_frame * this.sprite_size[1], this.sprite_size[0], this.sprite_size[1],
    //     this.pos[0], this.pos[1], this.sprite_size[0], this.sprite_size[1]);
    //   this.current_frame = (this.current_frame + 1) % this.frames;
    // } else {
    //   ctx.drawImage(this.image, this.pos[0], this.pos[1])
    // }

    let image = new Image();
    image.src = `../assets/spritesheets/006.png`;
    ctx.drawImage(image, 0, this.currentFrame * 91, 89, 91, this.pos[0], this.pos[1], 89, 91);
    this.currentFrame = (this.currentFrame + 1) % 142;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    // ctx.strokeStyle = "green";
    // ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  moveTo(location) {

  }
}

module.exports = Pokemon;
 


// class MovingObject {
//   constructor(options) {
//     this.pos = options.pos;
//     this.vel = options.vel;
//     this.radius = options.radius;
//     this.color = options.color;
//     this.game = options.game;
//     this.isWrappable = true;
//   }

//   collideWith(otherObject) {
//     // default do nothing
//   }

//   draw(ctx) {
//     ctx.fillStyle = this.color;

//     ctx.beginPath();
//     ctx.arc(
//       this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
//     );
//     ctx.fill();
//   }

//   isCollidedWith(otherObject) {
//     const centerDist = Util.dist(this.pos, otherObject.pos);
//     return centerDist < (this.radius + otherObject.radius);
//   }

//   move(timeDelta) {
//     // timeDelta is number of milliseconds since last move
//     // if the computer is busy the time delta will be larger
//     // in this case the MovingObject should move farther in this frame
//     // velocity of object is how far it should move in 1/60th of a second
//       this.pos[0] += this.vel[0];
//       this.pos[1] += this.vel[1];
    
//     // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
//     //     offsetX = this.vel[0] * velocityScale,
//     //     offsetY = this.vel[1] * velocityScale;

//     // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

//     // if (this.game.isOutOfBounds(this.pos)) {
//     //   if (this.isWrappable) {
//     //     this.pos = this.game.wrap(this.pos);
//     //   } else {
//     //     this.remove();
//     //   }
//     // }
//   }

//   remove() {
//     this.game.remove(this);
//   }
// }

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

// module.exports = MovingObject;
