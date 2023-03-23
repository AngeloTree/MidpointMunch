fetch("../config.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load config.json");
    }
    return response.json();
  })
  .then((config) => {
    const apiKey = config.apiKey;
    const address = encodeURIComponent(
      "1600 Amphitheatre Parkway, Mountain View, CA"
    );

    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    fetch(geocodingApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "OK") {
          const location = data.results[0].geometry.location;
          console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
        } else {
          console.error("Geocoding API error:", data.status);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  })
  .catch((error) => {
    console.error("Failed to load config.json:", error);
  });
