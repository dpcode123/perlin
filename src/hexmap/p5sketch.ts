import Hexagon from '@/hexmap/Hexagon'
import P5 from 'p5'

export default class Sketch {
  canvas: any

  constructor(canvas) {
    this.canvas = canvas;
  }

  drawP5jsSketchInstanceOnCanvas(mapParameters, showGrid) {
    // distance (px) from hexagon center to any corner
    const hexagonSize = parseInt(mapParameters.tileSize);
    // hexagon dimensions
    const hexagonWidth = Math.sqrt(3) * hexagonSize;
    const hexagonHeight = 2 * hexagonSize;
    // distance between adjacent hexagon centers
    const offsetX = hexagonWidth - 1;
    const offsetY = 3/4 * hexagonHeight - 1;
    // horizontal indentation of every other row
    const oddRowIndentationX = Math.sqrt(3)/2 * hexagonSize;
    // distance (px) of first tile (in top-left corner) from canvas edge
    const marginX = 1;
    const marginY = 2;
    // position of first tile
    const startingX = hexagonSize + marginX;
    const startingY = hexagonSize + marginY;
    // canvas dimensions
    const canvasWidth = mapParameters.gridWidthTiles * (hexagonWidth - 1) + hexagonWidth;
    const canvasHeight = (mapParameters.gridHeightTiles * (hexagonHeight*3/4 - 1)) + hexagonHeight;
    // all tiles
    const hexTiles: Hexagon[] = [];

    // add each tile to array
    for(let r = 0; r < mapParameters.gridHeightTiles; r++) {
      for(let t = 0; t < mapParameters.gridWidthTiles; t++) {
        const rowIndentationX = (r % 2 == 0) ? oddRowIndentationX : 0;
        
        hexTiles.push(
          new Hexagon(
            rowIndentationX + startingX + offsetX * t, 
            startingY + offsetY * r, 
            hexagonSize, 'name', r, t)
        );
      }
    }

    // create a P5 sketch instance with canvas element
    const sketch = s => {
      // setup canvas
      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        s.noiseSeed(mapParameters.noiseSeed);
        s.noLoop();
      };
      // draw tiles to canvas
      s.draw = () => {
        s.background(220);
        hexTiles.forEach(
          hexTile => hexTile.render(s, mapParameters, showGrid)
        );
      }
    
  }

  // add sketch instance to div with id 'canvas'
  this.canvas = new P5(sketch, 'canvas');
  }
}

