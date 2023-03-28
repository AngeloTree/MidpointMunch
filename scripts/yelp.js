// Make sure this script is loaded after the main script in your HTML file
// so that the midpoint value is available

if (window.midpoint) {
  console.log("Midpoint from main script:", window.midpoint);

  // Use Yelp API with the midpoint value here
} else {
  console.error("Midpoint value not found.");
}
