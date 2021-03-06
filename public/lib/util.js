
const Util = {
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  speed(vel) {
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
  },
  // Direction vector between two points.
  direction(pos1, pos2) {
    if(Util.dist(pos1, pos2) === 0) { return [0, 0] }
    return [
      (pos2[0] - pos1[0]) / Util.dist(pos1, pos2),
      (pos2[1] - pos1[1]) / Util.dist(pos1, pos2)
    ];
  },
  // Note we need 3 points for the rect in case the rectangle is tilted
  // Corners in ax,ay,bx,by,dx,dy
  // Point in x, y
  // Source: https://stackoverflow.com/a/2752754/2734863
  inRect(point, rect) {
    [x, y] = point;
    [ax, ay, bx, by, dx, dy] = rect;
    const bax = bx - ax;
    const bay = by - ay;
    const dax = dx - ax;
    const day = dy - ay;

    if ((x - ax) * bax + (y - ay) * bay < 0.0) {
      return false;
    }
    if ((x - bx) * bax + (y - by) * bay > 0.0) {
      return false;
    }
    if ((x - ax) * dax + (y - ay) * day < 0.0) {
      return false;
    }
    if ((x - dx) * dax + (y - dy) * day > 0.0) {
      return false;
    }

    return true;
  },
  randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += hexDigits[Math.floor(Math.random() * 16)];
    }

    return color;
  },
  pairs(arr) {
    let res = [],
      l = arr.length;
    for (var i = 0; i < l; ++i)
      for (var j = i + 1; j < l; ++j) res.push([arr[i], arr[j]]);
    return res;
  },
  // r = distance from right-angle point to unknown
  // C = right-angle point
  // B = other point
  findThirdPointInRightTriangle(C, B, r, left = 1) {// if left = 1 the D is left of the line AB. Run with -1 to get other side
    // Want other part of midpoint.
    // C = A + B / 2
    let A = [0,0];
    A[0] = 2*C[0] - B[0];
    A[1] = 2*C[1] - B[1];

    const nx = B[0] - A[0];
    const ny = B[1] - A[1];
    r /= Math.sqrt(nx * nx + ny * ny) * left;
    return [
      A[0] + nx / 2 - ny * r,
      A[1] + ny / 2 + nx * r
    ];
  },

  // The actual parsing; returns an object with properties.
  parseGIF(st, handler) {
    // Generic functions
    var bitsToNum = function(ba) {
      return ba.reduce(function(s, n) {
        return s * 2 + n;
      }, 0);
    };

    var byteToBitArr = function(bite) {
      var a = [];
      for (var i = 7; i >= 0; i--) {
        a.push(!!(bite & (1 << i)));
      }
      return a;
    };

    handler || (handler = {});

    // LZW (GIF-specific)
    var parseCT = function(entries) {
      // Each entry is 3 bytes, for RGB.
      var ct = [];
      for (var i = 0; i < entries; i++) {
        ct.push(st.readBytes(3));
      }
      return ct;
    };

    var readSubBlocks = function() {
      var size, data;
      data = "";
      do {
        size = st.readByte();
        data += st.read(size);
      } while (size !== 0);
      return data;
    };

    var parseHeader = function() {
      var hdr = {};
      hdr.sig = st.read(3);
      hdr.ver = st.read(3);
      if (hdr.sig !== "GIF") throw new Error("Not a GIF file."); // XXX: This should probably be handled more nicely.
      hdr.width = st.readUnsigned();
      hdr.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      hdr.gctFlag = bits.shift();
      hdr.colorRes = bitsToNum(bits.splice(0, 3));
      hdr.sorted = bits.shift();
      hdr.gctSize = bitsToNum(bits.splice(0, 3));

      hdr.bgColor = st.readByte();
      hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
      if (hdr.gctFlag) {
        hdr.gct = parseCT(1 << (hdr.gctSize + 1));
      }
      handler.hdr && handler.hdr(hdr);
    };

    var parseExt = function(block) {
      var parseGCExt = function(block) {
        var blockSize = st.readByte(); // Always 4
        var bits = byteToBitArr(st.readByte());
        block.reserved = bits.splice(0, 3); // Reserved; should be 000.
        block.disposalMethod = bitsToNum(bits.splice(0, 3));
        block.userInput = bits.shift();
        block.transparencyGiven = bits.shift();

        block.delayTime = st.readUnsigned();

        block.transparencyIndex = st.readByte();

        block.terminator = st.readByte();

        handler.gce && handler.gce(block);
      };

      var parseComExt = function(block) {
        block.comment = readSubBlocks();
        handler.com && handler.com(block);
      };

      var parsePTExt = function(block) {
        // No one *ever* uses this. If you use it, deal with parsing it yourself.
        var blockSize = st.readByte(); // Always 12
        block.ptHeader = st.readBytes(12);
        block.ptData = readSubBlocks();
        handler.pte && handler.pte(block);
      };

      var parseAppExt = function(block) {
        var parseNetscapeExt = function(block) {
          var blockSize = st.readByte(); // Always 3
          block.unknown = st.readByte(); // ??? Always 1? What is this?
          block.iterations = st.readUnsigned();
          block.terminator = st.readByte();
          handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
        };

        var parseUnknownAppExt = function(block) {
          block.appData = readSubBlocks();
          // FIXME: This won't work if a handler wants to match on any identifier.
          handler.app &&
            handler.app[block.identifier] &&
            handler.app[block.identifier](block);
        };

        var blockSize = st.readByte(); // Always 11
        block.identifier = st.read(8);
        block.authCode = st.read(3);
        switch (block.identifier) {
          case "NETSCAPE":
            parseNetscapeExt(block);
            break;
          default:
            parseUnknownAppExt(block);
            break;
        }
      };

      var parseUnknownExt = function(block) {
        block.data = readSubBlocks();
        handler.unknown && handler.unknown(block);
      };

      block.label = st.readByte();
      switch (block.label) {
        case 0xf9:
          block.extType = "gce";
          parseGCExt(block);
          break;
        case 0xfe:
          block.extType = "com";
          parseComExt(block);
          break;
        case 0x01:
          block.extType = "pte";
          parsePTExt(block);
          break;
        case 0xff:
          block.extType = "app";
          parseAppExt(block);
          break;
        default:
          block.extType = "unknown";
          parseUnknownExt(block);
          break;
      }
    };

    var parseImg = function(img) {
      var deinterlace = function(pixels, width) {
        // Of course this defeats the purpose of interlacing. And it's *probably*
        // the least efficient way it's ever been implemented. But nevertheless...
        var newPixels = new Array(pixels.length);
        var rows = pixels.length / width;
        var cpRow = function(toRow, fromRow) {
          var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
          newPixels.splice.apply(
            newPixels,
            [toRow * width, width].concat(fromPixels)
          );
        };

        // See appendix E.
        var offsets = [0, 4, 2, 1];
        var steps = [8, 8, 4, 2];

        var fromRow = 0;
        for (var pass = 0; pass < 4; pass++) {
          for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
            cpRow(toRow, fromRow);
            fromRow++;
          }
        }

        return newPixels;
      };

      img.leftPos = st.readUnsigned();
      img.topPos = st.readUnsigned();
      img.width = st.readUnsigned();
      img.height = st.readUnsigned();

      var bits = byteToBitArr(st.readByte());
      img.lctFlag = bits.shift();
      img.interlaced = bits.shift();
      img.sorted = bits.shift();
      img.reserved = bits.splice(0, 2);
      img.lctSize = bitsToNum(bits.splice(0, 3));

      if (img.lctFlag) {
        img.lct = parseCT(1 << (img.lctSize + 1));
      }

      img.lzwMinCodeSize = st.readByte();

      var lzwData = readSubBlocks();

      img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

      if (img.interlaced) {
        // Move
        img.pixels = deinterlace(img.pixels, img.width);
      }

      handler.img && handler.img(img);
    };

    var parseBlock = function() {
      var block = {};
      block.sentinel = st.readByte();

      switch (
        String.fromCharCode(block.sentinel) // For ease of matching
      ) {
        case "!":
          block.type = "ext";
          parseExt(block);
          break;
        case ",":
          block.type = "img";
          parseImg(block);
          break;
        case ";":
          block.type = "eof";
          handler.eof && handler.eof(block);
          break;
        default:
          throw new Error("Unknown block: 0x" + block.sentinel.toString(16)); // TODO: Pad this with a 0.
      }

      if (block.type !== "eof") setTimeout(parseBlock, 0);
    };

    var parse = function() {
      parseHeader();
      setTimeout(parseBlock, 0);
    };

    parse();
  }

  // randomVec(length) {
  //  const deg = 2 * Math.PI * Math.random();
  //  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  // },
  // scale(vec, m) {
  //   return [vec[0] * m, vec[1] * m];
  // },
  // inherits(childClass, parentClass) {
  //   function Surrogate() {}
  //   Surrogate.prototype = parentClass.prototype;
  //   surrogate = new Surrogate();
  //   childClass.prototype = surrogate;
  //   childClass.prototype.constructor = childClass;
  // }
};

module.exports = Util;