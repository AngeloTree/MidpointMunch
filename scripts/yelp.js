// Make sure this script is loaded after the main script in your HTML file
// so that the midpoint value is available

function fetchRestaurants(midpoint, yelpApiKey) {
  const { lat, lng } = midpoint;
  const apiUrl = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&categories=restaurants`;

  return fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${yelpApiKey}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Yelp API response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.businesses;
    });
}

export { fetchRestaurants };
