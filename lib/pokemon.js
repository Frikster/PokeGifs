const Stream = require("../vendor/stream");
const Util = require("./util");

class Pokemon {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.destination = options.destination;
    this.selected = options.selected;
    this.imgSrc = options.imgSrc;
    this.imgId = options.imgId;
    if (this.imgSrc && !this.spritesheetCanvas && this.imgSrc.slice(this.imgSrc.length - 3, this.imgSrc.length) === 'gif') {
      let img = document.createElement("img");
      img.src = this.imgSrc;
      img.id = this.imgId; 
      img.setAttribute("rel:animated_src", this.imgSrc);
      let div = document.getElementById("spritesheets");
      div.appendChild(img);

      let superGif = new SuperGif({
        gif: document.getElementById(this.imgId),
        auto_play: false
      });
      const play = (res) => {
        superGif.play();
        for (let i = 1; i < superGif.get_length(); i++) {
          let offset = { x: 0, y: i * superGif.get_canvas().height };
          superGif.set_frame_offset(i, offset);
        }
        superGif.set_sizes(superGif.get_canvas().width, superGif.get_length() * superGif.get_canvas().height);
        superGif.get_canvas().id = this.imgId;
        this.spritesheetCanvas = superGif.get_canvas();
        this.num_frames = superGif.get_length();
      }
      superGif.load(play);
    }
    this.currentFrame = 0;   

  }

  draw(ctx) {
    //TODO: delete if not needed
    if (false && !this.XMLHttpRequestData && !document.getElementById("charmander")) {
      var img = document.createElement("img");
      img.src = `https://sprites.pokecheck.org/bw/i/494.gif`;
      img.id = 'charmander'
      img.setAttribute("rel:animated_src", `https://sprites.pokecheck.org/bw/i/494.gif`);
      let div = document.getElementById("x");
      div.appendChild(img);

      img.onload = function () {
        if (!this.gifHeight && !this.gifWidth) { 
          this.gifHeight = img.height;
          this.gifWidth = img.width;
        }
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

          // stream = new Stream(this.XMLHttpRequestData);
          // setTimeout(doParse, 0);
        }
      }.bind(this)
      h.send();
    } else if (false && this.XMLHttpRequestData && !this.parsed) {
      let stream = new Stream(this.XMLHttpRequestData);


      // setTimeout(Util.parseGIF(stream, handler), 0);


      let charmander = new SuperGif({
        gif: document.getElementById("charmander"),
        auto_play: false
      });
      // debugger //TODO: TRY charmander.set_frame_offset   <---> setSizes


      // charmander.load();
      // Util.parseGIF(stream, charmander.handler)
      this.parsed = true;

    }

    if (this.spritesheetCanvas) {
      const height = this.spritesheetCanvas.height / this.num_frames;
      const width = this.spritesheetCanvas.width;
      ctx.drawImage(this.spritesheetCanvas, 0, this.currentFrame * height, width, height, this.pos[0], this.pos[1], width, height);
      this.currentFrame = (this.currentFrame + 1) % this.num_frames;
    } else {
      let img = new Image();
      img.src = this.imgSrc;
      img.id = this.imgId;
      ctx.drawImage(img, this.pos[0], this.pos[1]);
    }


    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
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

export default Pokemon;
 


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
