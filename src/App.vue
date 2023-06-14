<script setup lang="ts">
import {
  AppHeader,
  AppBuildRouteButton,
  AppFilterButton,
  AppMap,
  AppRestaurant,
  AppDistanceInfo,
  AppDistanceModes,
} from "./components";
import { defineProps } from "vue";

defineProps({});

const setPriceFilter = (count: number) => {
  console.log(count);
};
</script>

<template>
  <AppHeader />
  <main class="container">
    <aside class="filters">
      <AppFilterButton
        v-for="index in 4"
        :label="'$'.repeat(index)"
        :key="`filter-${index}`"
        @click="setPriceFilter(index)"
      />
    </aside>
    <section class="info">
      <AppMap />
      <div style="overflow-y: auto">
        <template v-if="false">
          <AppRestaurant v-for="indx in 10" :key="`restaurant-${indx}`" />
        </template>
        <AppRestaurant v-else>
          <AppDistanceInfo distance="4km" />
          <AppDistanceModes />
          <AppBuildRouteButton />
        </AppRestaurant>
      </div>
    </section>
  </main>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}
:root {
  font-family: Roboto, sans-serif;
  color: #222222;
  background-color: #ffffff;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
  user-select: none;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

.container {
  margin-inline: auto;
  padding-inline: 16px;
  padding-block: 24px;
  width: min(1385px, 100vw);
  flex-grow: 1;
}

.filters {
  margin-bottom: 24px;
}

.info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 8px;
  height: calc(100vh - 12rem);
}
</style>
