<script setup lang="ts">
import { IconStar } from "@/components/icons";
</script>

<template>
  <section class="app-restaurant">
    <img
      class="app-restaurant__image"
      src="restaurant.photoUrl"
      alt="restaurant.name"
    />
    <h2 class="app-restaurant__name">name</h2>
    <span class="app-restaurant__rating">
      <IconStar />
      rating
    </span>
    <address class="app-restaurant__address">formatted_address</address>
    <span class="app-restaurant__price">$</span>
    <div class="app-restaurant__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.app-restaurant {
  padding: 10px;
  border: 1px solid #d7e6f0;
  display: grid;
  grid-template-columns: 1fr max-content;
  row-gap: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
}

.app-restaurant__image {
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  grid-column: 1 / span 2;
  background-color: #d7e6f0;
  aspect-ratio: 16 / 9;
}

.app-restaurant__name {
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
}

.app-restaurant__rating {
  display: inline-flex;
  align-items: center;
  column-gap: 8px;
  font-size: 20px;
  line-height: 23px;
}

.app-restaurant__address {
  font-size: 16px;
  line-height: 19px;
  color: rgba(34, 34, 34, 0.35);
  grid-column: 1 / span 2;
}

.app-restaurant__content {
  grid-column: 1 / span 2;
  text-align: center;
}
</style>
