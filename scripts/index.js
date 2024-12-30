// SpaceXs JavaScript Code

// NASA API Key
const API_KEY = 'iMlnGtF0lUGIEXefzgDIuFnKR5IgTtfXRUvoDSUm';

// NASA API URLs
const METEOR_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-07-01&end_date=2024-12-30&api_key=${API_KEY}`;
const QUOTE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// DOM element to display SpaceXs information cards
const quoteContainer = document.querySelector('.card-container');
if (quoteContainer) {
  quoteContainer.classList.add('topping');
  quoteContainer.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
}

/**
 * Fetch and display a random NASA quote of the day.
 * This feature showcases an image or video provided by NASA along with an explanation,
 * adding value to SpaceXs viewers with daily content.
 * 
 * @param {string} date - Date to fetch the quote for (YYYY-MM-DD format).
 */
async function getQuote(date) {
  try {
    const response = await fetch(`${QUOTE_URL}&date=${date}`);
    const data = await response.json();

    if (quoteContainer) {
      const infoCard = document.createElement('div');
      infoCard.classList.add('spacexs-card');
      infoCard.innerHTML = `
        <h2 class="card-top">Information of the Day</h2>
        <img src="${data.hdurl || data.url}" alt="NASA Quote Image of the Day" class="card-img">
        <p class="spacexs-text">${data.explanation}</p>
        <i class="timestamp">${data.date}</i>
      `;
      quoteContainer.innerHTML = '';
      quoteContainer.classList.remove('topping');
      quoteContainer.appendChild(infoCard);
    }
  } catch (error) {
    console.error("Error fetching quote:", error.message);
  }
}

/**
 * Fetch and log Mars weather data.
 * Displays the latest weather information from Mars if available.
 * (Adjust functionality as needed for deprecated APIs.)
 */
async function getWeather() {
  try {
    const response = await fetch(WEATHER_URL);
    const data = await response.json(); // Adjust based on actual API response format
    console.log("Mars Weather Data:", data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

/**
 * Generates a random date within a specified range.
 * Useful for fetching random data from NASA's APIs.
 * 
 * @param {string} startDate - Start date in YYYY-MM-DD format.
 * @param {string} endDate - End date in YYYY-MM-DD format.
 * @returns {string} Randomly generated date in YYYY-MM-DD format.
 */
function getRandomDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomTime = Math.random() * (end.getTime() - start.getTime()) + start.getTime();
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0];
}

// Initialize SpaceXs features when the page loads
window.addEventListener('DOMContentLoaded', () => {
  // Generate a random date for fetching a NASA quote
  const randomDate = getRandomDate("2015-07-01", "2024-12-30");
  getQuote(randomDate);

  // Fetch Mars weather data (may need adjustments if the API is retired)
  getWeather();
});