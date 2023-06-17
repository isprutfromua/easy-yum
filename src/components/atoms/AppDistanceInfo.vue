<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  onMounted,
  reactive,
  ref,
  computed,
  onUnmounted,
  watch,
} from "vue";
import { useGoogleMaps } from "@/composables/useGoogleMaps";
import { AppDistanceMode } from "@/components";

interface TDistanceInfo {
  duration: string;
  distance: string;
}

const isLoading = ref(false);

const { getDistance } = useGoogleMaps();
const emit = defineEmits<{
  (e: "mode:update", value: string): void;
}>();
const props = defineProps<{
  destination: google.maps.places.PlaceGeometry;
}>();
const routes = reactive<Record<google.maps.TravelMode, TDistanceInfo>>({});
const currentMode = ref<keyof typeof google.maps.TravelMode>(
  google.maps.TravelMode.WALKING
);
const distance = computed(() => routes[currentMode.value]?.distance);

const calculateDistance = async () => {
  if (props.destination.location) {
    isLoading.value = true;
    let mode: keyof typeof google.maps.TravelMode;

    for (mode in google.maps.TravelMode) {
      const { routes: distanceInfo } = await getDistance(
        props.destination.location,
        mode
      );

      routes[mode] = {
        duration: distanceInfo[0].legs[0].duration?.text ?? "",
        distance: distanceInfo[0].legs[0].distance?.text ?? "",
      };
    }
    isLoading.value = false;
  }
};
onMounted(calculateDistance);

watch(() => props.destination, calculateDistance);

const setMode = (mode: keyof typeof google.maps.TravelMode) => {
  currentMode.value = mode;
  emit("mode:update", mode);
};
</script>

<template>
  <div class="app-distance__info">
    <p>Distance</p>
    <span>{{ isLoading ? "calculating..." : distance }}</span>
  </div>
  <div class="app-distance__modes" v-if="!isLoading">
    <AppDistanceMode
      :class="{ 'is-active': mode === currentMode }"
      v-for="mode in Object.keys(routes)"
      :key="mode"
      :type="mode"
      :duration="routes[mode].duration"
      @click="setMode(mode)"
    />
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

.app-distance__modes {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 16px;
  margin-top: 16px;
  height: 100px;
}

span {
  font-size: 2rem;
}
</style>
