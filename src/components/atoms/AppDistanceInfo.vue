<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  onMounted,
  reactive,
  ref,
  computed,
  watch,
} from "vue";
import { useGoogleMaps } from "@/composables/useGoogleMaps";
import { AppDistanceMode } from "@/components";

interface DistanceInfo {
  duration: string;
  distance: string;
}

const isLoading = ref(false);
const error = ref(false);
const { getDistance } = useGoogleMaps();

const emit = defineEmits<{
  (e: "mode:update", value: string): void;
}>();
const props = defineProps<{
  destination: google.maps.places.PlaceGeometry;
}>();

type TRouteMode = Record<google.maps.TravelMode, DistanceInfo>;

const routes = reactive<TRouteMode>({} as TRouteMode);
const currentMode = ref<keyof typeof google.maps.TravelMode>(
  google.maps.TravelMode.WALKING
);
const distance = computed(() => routes[currentMode.value]?.distance);

const calculateDistance = async () => {
  if (props.destination.location) {
    isLoading.value = true;
    let mode: keyof typeof google.maps.TravelMode;

    for (mode in google.maps.TravelMode) {
      const distanceInfo = await getDistance(props.destination.location, mode);

      if (distanceInfo) {
        routes[mode] = {
          duration: distanceInfo.routes[0].legs[0].duration?.text ?? "",
          distance: distanceInfo.routes[0].legs[0].distance?.text ?? "",
        };
      } else {
        error.value = true;
      }
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
  <div v-if="!error">
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
        :duration="routes[mode as keyof typeof routes].duration"
        @click="setMode(mode as keyof typeof routes)"
      />
    </div>
  </div>
  <p v-else style="margin-block: 1rem; font-size: 1.1rem">
    We cant support this route. Please change your location
  </p>
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
  column-gap: 4px;
  margin-top: 16px;
  height: 100px;
}

span {
  font-size: 2rem;
}
</style>
