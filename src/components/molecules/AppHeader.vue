<script setup lang="ts">
import { AppLogo, AppInput } from "@/components";
import { IconSearch } from "@/components/icons";
import { ref } from "vue";

const searchQuery = ref("");
const handleSubmit = () => {
  console.log(searchQuery.value);
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
