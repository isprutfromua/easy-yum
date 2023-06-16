<script setup lang="ts">
import { defineEmits } from "vue";

defineEmits<{
  (e: "update", value: string): void;
}>();
</script>

<template>
  <div id="map" class="map">Loading map ...</div>
</template>

<style scoped>
.map {
  border-radius: 40px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  background-color: black;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
</style>
