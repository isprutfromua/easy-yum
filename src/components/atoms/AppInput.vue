<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
interface Props {
  placeholder: string;
  value: string;
}

defineProps<Props>();
defineEmits<{
  (e: "update:value", value: string): void;
}>();
</script>

<template>
  <label class="input__wrapper">
    <button type="submit" v-if="$slots['input-icon']" title="Search">
      <slot name="input-icon" />
    </button>
    <input
      type="search"
      name="search"
      :value="value"
      :placeholder="placeholder"
      required
      minlength="3"
      pattern="[a-z]*"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<style scoped>
input {
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  appearance: none;
  background-color: transparent;
  border: none;
  min-width: 300px;
}

input:focus,
input:focus-visible {
  outline: none;
}

.input__wrapper {
  display: flex;
  align-items: center;
  column-gap: 13px;
}

button {
  all: unset;
  cursor: pointer;
}
</style>
