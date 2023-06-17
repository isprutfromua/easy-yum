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
  width: calc(100% - 470px);
  height: 100%;
  background-color: black;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
</style>
