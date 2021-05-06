export default class Hexagon {
    x: number
    y: number
    r: number
    name: string
    row: number
    tile: number

    constructor(x, y, r, name, row, tile) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.name = name;
      this.row = row;
      this.tile = tile;
    }

    render(sketch, mapParameters, showGrid) {
      const n = sketch.noise(this.row * mapParameters.noiseScale, this.tile * mapParameters.noiseScale);
      const hexTileFillColor = this.getTileColor(sketch, mapParameters, n);

      sketch.fill(hexTileFillColor);
      this.drawHexagon(sketch, this.x, this.y, this.r, showGrid);
    }

    drawHexagon(sketch, x, y, r, showGrid) {
      sketch.beginShape();

      // show grid lines (hexagon borders)
      sketch.stroke(50, 50, 50);
      showGrid ? sketch.strokeWeight(1) : sketch.strokeWeight(0);

      for (let a = 0; a < 2 * sketch.PI; a += 2 * sketch.PI / 6) {
        let y2 = sketch.cos(a) * r;
        let x2 = sketch.sin(a) * r;
        sketch.vertex(x + x2, y + y2);
      }
      sketch.endShape(sketch.CLOSE);
    }

    getTileColor(sketch, mapParameters, noise) { 
      const colorDeepSea = sketch.color(0, 105, 148); 
      const colorShallowSea = sketch.color(0, 120, 188); 
      const colorSand = sketch.color(174,160, 115); 
      const colorWoods = sketch.color(66, 105, 47);
      
      let hexTileFillColor;

      // deep sea
      if (noise < mapParameters.seaToTerrainRatio * mapParameters.deepSeaToShallowSeaRatio) {
        hexTileFillColor = colorDeepSea;
      }
      // shallow sea
      else if (noise < mapParameters.seaToTerrainRatio) {
        hexTileFillColor = colorShallowSea;
      }
      // sand
      else if (noise < (mapParameters.seaToTerrainRatio + (mapParameters.seaToTerrainRatio * mapParameters.sandToWoodsRatio))) {
        hexTileFillColor = colorSand;
      }
      // woods
      else {
        hexTileFillColor = colorWoods;
      }
      
      return hexTileFillColor;
    }

  }