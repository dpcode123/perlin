<template>
  <PerlinNoiseMapGenerator />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PerlinNoiseMapGenerator from '@/components/PerlinNoiseMapGenerator.vue'

export default defineComponent({
  name: 'Home',
  components: {
    PerlinNoiseMapGenerator,
  },
});
</script>
