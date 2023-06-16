// Import the necessary dependencies
import { ref, Ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.VUE_APP_GOOGLE_MAP_ID;

export function useGoogleMaps() {
  const map = ref<google.maps.Map | null>(null);
  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
  });

  async function injectMap(
    coords: Ref<GeolocationCoordinates>,
    error: Ref<GeolocationPositionError>
  ) {
    if (error?.value) console.error("Failed to fetch geolocation", error.value);

    const mapOptions: google.maps.MapOptions = {
      center: {
        lat: coords.value.latitude,
        lng: coords.value.longitude,
      },
      zoom: 12,
      mapId: MAP_ID,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
      backgroundColor: "#353535",
      clickableIcons: true,
      fullscreenControl: false,
      streetViewControl: false,
    };
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      const { Map } = (await loader.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      map.value = new Map(mapContainer, mapOptions);
    } else {
      console.error(`Element not found.`);
    }
  }

  async function placeMarker(coords: Ref<GeolocationCoordinates>) {
    const { Marker } = (await loader.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    new Marker({
      position: new window.google.maps.LatLng(
        coords.value.latitude,
        coords.value.longitude
      ),
      map: map.value,
    });
  }

  return { map, injectMap, placeMarker };
}
