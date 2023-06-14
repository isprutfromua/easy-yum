<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{ prop: number }>();
defineEmits<{
  (e: "update", value: string): void;
}>();
</script>

<template>
  <div class="map"></div>
</template>

<style scoped>
.map {
  border-radius: 40px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  background-color: black;
}
</style>
