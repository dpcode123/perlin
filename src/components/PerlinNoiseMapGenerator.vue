<template>
  <header>
    <div class="parameter-settings-container">
      
      <div class="parameter-setting">
        <!-- Noise seed -->
        <span>Noise Seed #</span>
        <div>
          <input type="number" v-model="mapParameters.noiseSeed">
          <button @click="generateRandomSeedNumber" class="btn-large">Random seed</button>
        </div>
      </div>
      
      <div class="parameter-setting">
        <!-- Tile size -->
        <span class="setting-title">Tile size: {{ mapParameters.tileSize }}</span>
        <div>
          <input type="range" class="range-slider" min="10" max="100" step="1" v-model="mapParameters.tileSize" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
        <hr>
        <!-- Show grid -->
        <span class="setting-title">Show grid: {{ showGrid }}</span>
        <div>
          <input type="checkbox" v-model="showGrid" @change="generateMap">
        </div>
      </div>

      <div class="parameter-setting">
        <!-- Grid height (number of tiles) -->
        <span class="setting-title">Grid height (tiles): {{ mapParameters.gridHeightTiles }}</span>
        <div>
          <input type="range" class="range-slider" min="1" max="100" step="1" v-model="mapParameters.gridHeightTiles" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
        <!-- Grid width (number of tiles) -->
        <span class="setting-title">Grid width (tiles): {{ mapParameters.gridWidthTiles }}</span>
        <div>
          <input type="range" class="range-slider" min="1" max="100" step="1" v-model="mapParameters.gridWidthTiles" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
      </div>
      
      <div class="parameter-setting">
        <!-- Noise scale -->
        <span class="setting-title">Noise scale: {{ mapParameters.noiseScale }}</span>
        <div>
          <input type="range" class="range-slider" min="0.01" max="0.15" step="0.01" v-model="mapParameters.noiseScale" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
        <!-- Sea/Terrain ratio -->
        <span class="setting-title">Sea/Terrain ratio: {{ Math.round(mapParameters.seaToTerrainRatio*100) }}</span>
        <div>
          <input type="range" class="range-slider" min="0.01" max="1.00" step="0.01" v-model.number="mapParameters.seaToTerrainRatio" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
      </div>
      
      <div class="parameter-setting">
        <!-- Deep/Shallow sea ratio-->
        <span class="setting-title">Deep/Shallow sea ratio: {{ Math.round(mapParameters.deepSeaToShallowSeaRatio*100) }}</span>
        <div>
          <input type="range" class="range-slider" min="0.01" max="1.00" step="0.01" v-model.number="mapParameters.deepSeaToShallowSeaRatio" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
        <!-- Sand/Woods ratio -->
        <span class="setting-title">Sand/Woods ratio: {{ Math.round(mapParameters.sandToWoodsRatio*100) }}</span>
        <div>
          <input type="range" class="range-slider" min="0.01" max="1.00" step="0.01" v-model.number="mapParameters.sandToWoodsRatio" @mouseup="generateMap" @keyup="generateMap" @touchend="generateMap">
        </div>
      </div>
      
      <div class="parameter-setting">
        <!-- Reset button -->
        <span class="setting-title">Reset to default</span><br />
        <button @click="reset" class="btn-large">RESET</button>
      </div>

    </div>
  </header>
  <main>
    <div id="canvas"></div>
  </main>
</template>

<script>
import { computed, defineComponent, ref, reactive, watch } from 'vue'
import Sketch from '@/hexmap/p5sketch'

// default map parameters 
const SHOW_GRID = true
const GRID_TILE_SIZE = 16
const GRID_WIDTH_TILES = 64
const GRID_HEIGHT_TILES = 48
const NOISE_SEED = 123123123123123
const NOISE_SCALE = 0.05
const SEA_TO_TERRAIN_RATIO = 0.60
const DEEP_TO_SHALLOW_RATIO = 0.93
const SAND_TO_WOODS_RATIO = 0.05

export default defineComponent({
  name: 'PerlinNoiseMapGenerator',
  setup() {
    let canvas = null
    const sketch = new Sketch(canvas)
    
    const mapParameters = reactive({
      tileSize: Number = GRID_TILE_SIZE,
      gridWidthTiles: Number = GRID_WIDTH_TILES,
      gridHeightTiles: Number = GRID_HEIGHT_TILES,
      noiseSeed: Number = NOISE_SEED,
      noiseScale: Number = NOISE_SCALE,
      seaToTerrainRatio: Number = SEA_TO_TERRAIN_RATIO,
      deepSeaToShallowSeaRatio: Number = DEEP_TO_SHALLOW_RATIO,
      sandToWoodsRatio: Number = SAND_TO_WOODS_RATIO
    })
    const showGrid = ref(SHOW_GRID)
    
    const seedWatcher = computed(() => mapParameters.noiseSeed)
    watch([seedWatcher], () => { generateMap() })

    generateMap()
    
    
    function generateMap() {
      clearTheCanvas()
      sketch.drawP5jsSketchInstanceOnCanvas(mapParameters, showGrid.value)
    }

    function generateRandomSeedNumber() {
      mapParameters.noiseSeed = Math.ceil(Math.random() * 9007199254740991) * (Math.round(Math.random()) ? 1 : -1)
    }

    function clearTheCanvas() {
      const canvasDiv = document.querySelector('#canvas');
      if(canvasDiv) {
        [].slice.call(canvasDiv.children).forEach(child => canvasDiv.removeChild(child));
      }
    }
    
    function setParametersToDefault() {
      showGrid.value = SHOW_GRID
      mapParameters.tileSize = GRID_TILE_SIZE
      mapParameters.gridWidthTiles = GRID_WIDTH_TILES
      mapParameters.gridHeightTiles = GRID_HEIGHT_TILES
      mapParameters.noiseSeed = NOISE_SEED
      mapParameters.noiseScale = NOISE_SCALE
      mapParameters.seaToTerrainRatio = SEA_TO_TERRAIN_RATIO
      mapParameters.deepSeaToShallowSeaRatio = DEEP_TO_SHALLOW_RATIO
      mapParameters.sandToWoodsRatio = SAND_TO_WOODS_RATIO
    }

    function reset() {
      setParametersToDefault()
      generateMap()
    }


    return {
      mapParameters,
      showGrid,
      generateMap,
      generateRandomSeedNumber,
      reset,
      clearTheCanvas
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto';
}

header {
  background: rgb(247, 247, 247);
}

.parameter-settings-container {
  display: flex;
  border-bottom: 1px solid rgb(129, 129, 129);
}

.parameter-setting {
  max-width: 200px;
  margin: 20px;
}

.range-slider {
  width: 200px;
}

.btn-large {
  font-size: 1.2rem;
  border-radius: 6px;
  margin-top: 10px;
  background-color: rgb(230, 230, 230);
}
.btn-large:hover {
  background-color: rgb(207, 207, 207);
  cursor: pointer;
}
</style>