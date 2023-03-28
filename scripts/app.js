import { fetchRestaurants } from "./yelp.js";

const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const findButton = document.querySelector("#findButton");

// Function to caculatre the midpoint
function calculateMidpoint(location1, location2) {
  const midpointLat = (location1.lat + location2.lat) / 2;
  const midpointLng = (location1.lng + location2.lng) / 2;

  return { lat: midpointLat, lng: midpointLng };
}

// Function to fetch the geocoding API result
function geocodeAddress(apiKey, address) {
  const encodedAddress = encodeURIComponent(address);
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  return fetch(geocodingApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error("Geocoding API error: " + data.status);
      }
    });
}

fetch("../config.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load config.json");
    }
    return response.json();
  })
  .then((config) => {
    const apiKey = config.apiKey;

    findButton.addEventListener("click", (event) => {
      event.preventDefault();

      const address1Value = address1.value;
      const address2Value = address2.value;

      Promise.all([
        geocodeAddress(apiKey, address1Value),
        geocodeAddress(apiKey, address2Value),
      ])
        .then(([location1, location2]) => {
          console.log("Address 1:", location1);
          console.log("Address 2:", location2);

          const midpoint = calculateMidpoint(location1, location2);

          // Call the fetchRestaurants function after the midpoint is calculated
          fetch("../config.json")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to load config.json");
              }
              return response.json();
            })
            .then((config) => {
              const yelpKey = config.yelpKey;
              return fetchRestaurants(midpoint, yelpKey);
            })
            .then((restaurants) => {
              console.log("Restaurants: ", restaurants);
            })
            .catch((error) => {
              console.error("Yelp API error: ", error);
            });
        })
        .catch((error) => {
          console.error("Geocoding error:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Failed to load config.json:", error);
  });
