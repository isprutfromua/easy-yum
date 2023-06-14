<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  distance: number;
}>();
</script>

<template>
  <div class="app-distance__info">
    <p>Distance</p>
    <span>{{ distance }}</span>
  </div>
</template>

<style lang="css" scoped>
.app-distance__info {
  padding-block: 7px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 1.125rem;
}

span {
  font-size: 2rem;
}
</style>
