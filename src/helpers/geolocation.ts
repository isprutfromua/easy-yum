export function getUserGeolocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
    }

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     resolve(position.coords);
    //   },
    //   (error) => {
    //     reject(new Error(`Failed to retrieve geolocation: ${error.message}`));
    //   }
    // );

    setTimeout(() => {
      resolve({
        accuracy: 19,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 51.507351,
        longitude: -0.127758,
        speed: null,
      });
    }, 2000);
  });
}
