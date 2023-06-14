<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  label: string;
}>();
</script>

<template>
  <button type="button">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  border-radius: 20px;
  border-style: solid;
  border-color: #d7e6f0;
  border-width: 1px;
  background-color: white;
  width: 55px;
  height: 30px;
  cursor: pointer;
  margin-right: 5px;
}

button.is-active,
button:hover,
button:focus-within {
  background: #f5f5f5;
  border-color: transparent;
}
</style>
