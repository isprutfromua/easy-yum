// Import the necessary dependencies
import { ref, Ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.VUE_APP_GOOGLE_MAP_ID;

const center = ref<google.maps.LatLng>();
const servicesLoaded = ref(false);
const RoutesLibrary = ref<google.maps.RoutesLibrary | null>(null);
const CoreLibrary = ref<google.maps.CoreLibrary | null>(null);
const MapsLibrary = ref<google.maps.MapsLibrary | null>(null);
const MarkerLibrary = ref<google.maps.MarkerLibrary | null>(null);
const PlacesLibrary = ref<google.maps.PlacesLibrary | null>(null);

const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);

export function useGoogleMaps() {
  console.log("Google Maps has been initialized ✅✅✅");

  const map = ref<google.maps.Map | null>(null);
  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
  });

  (async function initServices() {
    if (servicesLoaded.value) return;

    try {
      console.log("Services initialization");
      RoutesLibrary.value = await loader.importLibrary("routes");
      CoreLibrary.value = await loader.importLibrary("core");
      MapsLibrary.value = await loader.importLibrary("maps");
      MarkerLibrary.value = await loader.importLibrary("marker");
      PlacesLibrary.value = await loader.importLibrary("places");

      directionsRenderer.value = new RoutesLibrary.value.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#e5c163",
          strokeWeight: 6,
        },
      });

      servicesLoaded.value = true;
      console.log("Services initialized");
    } catch (error) {
      console.error(error);
    }
  })();

  async function injectMap(
    coords: Ref<GeolocationCoordinates>,
    error: Ref<GeolocationPositionError>
  ) {
    if (error?.value || !CoreLibrary.value || !servicesLoaded.value) {
      throw new Error("Failed to fetch geolocation");
    }

    center.value = new CoreLibrary.value.LatLng(
      coords.value.latitude,
      coords.value.longitude
    );

    console.log("Map initialization");

    console.log(center.value);

    const mapOptions: google.maps.MapOptions = {
      center: center.value,
      zoom: 14,
      mapId: MAP_ID,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
      backgroundColor: "#353535",
      clickableIcons: true,
      fullscreenControl: false,
      streetViewControl: false,
    };
    const mapContainer = document.getElementById("map");
    if (mapContainer && MapsLibrary.value) {
      map.value = new MapsLibrary.value.Map(mapContainer, mapOptions);
    } else {
      console.error(`Element not found or MapsLibrary isn't available`);
    }
  }

  async function placeMarker(
    coords: GeolocationCoordinates,
    options?: Partial<google.maps.MarkerOptions>
  ) {
    if (!CoreLibrary.value || !MarkerLibrary.value) {
      throw new Error("Libraries isn`t available");
    }

    return new MarkerLibrary.value.Marker({
      position: new CoreLibrary.value.LatLng(coords.latitude, coords.longitude),
      map: map.value,
      ...options,
    });
  }

  async function searchPlaces(query: string) {
    if (!PlacesLibrary.value || !map.value) {
      throw new Error("PlacesLibrary isn`t available");
    }

    const PlacesService = new PlacesLibrary.value.PlacesService(map.value);

    if (!PlacesService) {
      console.error("Places service isn't available");
      return [];
    }

    const searchReq: google.maps.places.TextSearchRequest = {
      type: "restaurant",
      location: center.value,
      query,
    };

    return new Promise<google.maps.places.PlaceResult[]>((res, rej) => {
      PlacesService?.textSearch(searchReq, (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results?.length
        ) {
          res(results);
        } else {
          rej([]);

          throw new Error(
            `Error happened while trying to fetch ${query} places`
          );
        }
      });
    });
  }

  async function getDistance(
    destination: google.maps.LatLng,
    mode: keyof typeof google.maps.TravelMode
  ) {
    if (!center.value || !RoutesLibrary.value) {
      throw new Error(`Coordinates isn't available. Please try again`);
    }

    const directionService = new RoutesLibrary.value.DirectionsService();

    const result: google.maps.DirectionsResult = await directionService.route({
      origin: center.value,
      travelMode: google.maps.TravelMode[mode],
      destination,
    });

    return result;
  }

  function drawDirection(directions: google.maps.DirectionsResult | null) {
    if (!center.value || !directionsRenderer.value) {
      throw new Error(`directionsRenderer isn't available. Please try again`);
    }

    const isRenderedDirections = directionsRenderer.value.getDirections();

    if (isRenderedDirections || !directions) {
      directionsRenderer.value.setMap(null);

      if (directions === null) return;
    }

    directionsRenderer.value.setMap(map.value);
    directionsRenderer.value.setDirections(directions);
  }

  return {
    map,
    injectMap,
    placeMarker,
    searchPlaces,
    getDistance,
    drawDirection,
  };
}
