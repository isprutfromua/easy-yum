<script setup lang="ts">
import { AppDistanceMode } from "@/components";

const modes = [
  {
    type: "WALKING",
    duration: "30min.",
  },
  {
    type: "CYCLING",
    duration: "20min.",
  },
  {
    type: "DRIVING",
    duration: "10min.",
  },
  {
    type: "TRAFFIC",
    duration: "15min.",
  },
];
</script>

<template>
  <div class="app-distance__modes">
    <AppDistanceMode v-for="mode in modes" :key="mode.type" v-bind="mode" />
  </div>
</template>

<style lang="css" scoped>
.app-distance__modes {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 16px;
  margin-top: 16px;
}
</style>
