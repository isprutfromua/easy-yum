<script setup lang="ts">
import { defineProps, computed } from "vue";
const props = defineProps<{
  type: google.maps.TravelMode;
  duration: string;
}>();

const imageSrc = computed(() =>
  require("@/assets/modes/" + props.type.toLowerCase() + ".png")
);
</script>

<template>
  <div class="app-distance__mode">
    <img :src="imageSrc" :alt="`${type} mode`" />
    <span>{{ duration }}</span>
  </div>
</template>

<style lang="css" scoped>
.app-distance__mode {
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  padding: 16px;
  border-radius: 16px;

  color: rgba(34, 34, 34, 0.35);
}

.app-distance__mode.is-active {
  background-color: aliceblue;
}
</style>
