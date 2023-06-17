<script setup lang="ts">
import { AppLogo, AppInput } from "@/components";
import { IconSearch } from "@/components/icons";
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits<{
  (e: "submit:value", value: string): void;
}>();

const handleSubmit = () => {
  emit("submit:value", searchQuery.value);
  searchQuery.value = "";
};
const handleValueUpdate = (newVal: string) => (searchQuery.value = newVal);
</script>

<template>
  <header class="header">
    <AppLogo class="header__logo" />
    <form @submit.prevent="handleSubmit">
      <AppInput
        :value="searchQuery"
        placeholder="Search for burgers, pizza, pasta..."
        @update:value="handleValueUpdate"
      >
        <template #input-icon>
          <IconSearch />
        </template>
      </AppInput>
    </form>
  </header>
</template>

<style scoped>
.header {
  background: #f5f5f5;
  padding: 18px 26px;
  display: flex;
  align-items: center;
}

.header__logo {
  margin-right: 44px;
}
</style>
