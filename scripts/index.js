// SpaceXs JavaScript Code
// This script fetches and displays random NASA quotes and weather data using NASA's public APIs.
// The project is designed as part of the SpaceXs initiative to make space information accessible.

const API_KEY = 'iMlnGtF0lUGIEXefzgDIuFnKR5IgTtfXRUvoDSUm';

// NASA API URLs for SpaceXs project
// METEOR_URL fetches meteor data
const METEOR_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-07-01&end_date=2024-12-30&api_key=${API_KEY}`;

// QUOTE_URL fetches the Astronomy Picture of the Day (APOD) for the SpaceXs information card
const QUOTE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// WEATHER_URL fetches Mars weather data for SpaceXs weather updates
const WEATHER_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

// DOM element to display SpaceXs information cards
const quoteContainer = document.querySelector('.card-container');

// Function to fetch and display a random NASA quote for the SpaceXs card
async function getQuote(date) {
  try {
    // Add the random date to the API request for the SpaceXs quote
    const QUOTE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    const response = await fetch(QUOTE_URL);
    const data = await response.json();
    console.log(data);

    // Create a SpaceXs card to display the information
    const infoCard = document.createElement('div');
    infoCard.classList.add('spacexs-card');
    infoCard.innerHTML = `
      <h2 class="card-top">Information of the day</h2>
      <img src="${data.hdurl || data.url}" alt="spacexs-quote-image" class="card-img">
      <p class="spacexs-text">
        ${data.explanation}
      </p>
      <i class="timestamp">${data.date}</i>
    `;
    quoteContainer.appendChild(infoCard);
  } catch (error) {
    console.error(error.message);
  }
}

// Function to fetch and log Mars weather data for SpaceXs weather updates
async function getWeather() {
  try {
    const response = await fetch(WEATHER_URL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

// Event listener to initialize SpaceXs features when the page loads
window.addEventListener('DOMContentLoaded', () => {
  getWeather(); // Fetch Mars weather for SpaceXs
  const randomDate = getRandomDate("2015-07-01", "2024-12-30");
  getQuote(randomDate); // Fetch and display a random SpaceXs quote
});

// Function to generate a random date for fetching SpaceXs quotes
function getRandomDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomTime = Math.random() * (end - start) + start.getTime();
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
}

// Example usage of SpaceXs project features:
// - Fetches random NASA quotes
// - Fetches Mars weather data