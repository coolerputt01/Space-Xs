// SpaceXs JavaScript Code
const API_KEY: string = 'iMlnGtF0lUGIEXefzgDIuFnKR5IgTtfXRUvoDSUm';

// NASA API URLs
const METEOR_URL: string = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-07-01&end_date=2024-12-30&api_key=${API_KEY}`;
const QUOTE_URL: string = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// DOM element to display SpaceXs information cards
const quoteContainer: HTMLElement | null = document.querySelector('.card-container');
if (quoteContainer) {
  quoteContainer.classList.add('topping');
  quoteContainer.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
}

interface NasaQuoteOfTheDay {
  hdurl: string;
  explanation: string;
  date: string;
  url ? : string;
}

interface Temperatures {
  sol: number;
  season: string;
  temperature: {
    av: number;
    min: number;
    max: number;
  };
}

// Fetch and display a random NASA quote
async function getQuote(date: string): Promise < void > {
  try {
    const response: Response = await fetch(`${QUOTE_URL}&date=${date}`);
    const data: NasaQuoteOfTheDay = await response.json();

    if (quoteContainer) {
      const infoCard: HTMLElement = document.createElement('div');
      infoCard.classList.add('spacexs-card');
      infoCard.innerHTML = `
        <h2 class="card-top">Information of the Day</h2>
        <img src="${data.hdurl || data.url}" alt="spacexs-quote-image" class="card-img">
        <p class="spacexs-text">${data.explanation}</p>
        <i class="timestamp">${data.date}</i>
      `;
      quoteContainer.innerHTML = '';
      quoteContainer.classList.remove('topping');
      quoteContainer.appendChild(infoCard);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quote:", error.message);
    }
  }
}

// Fetch and log Mars weather data
async function getWeather(): Promise < void > {
  try {
    const response: Response = await fetch(WEATHER_URL);
    const data = await response.json(); // Adjust based on actual API response format
    console.log("Mars Weather Data:", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching weather data:", error.message);
    }
  }
}

// Initialize SpaceXs features when the page loads
window.addEventListener('DOMContentLoaded', () => {
  const randomDate: string = getRandomDate("2015-07-01", "2024-12-30");
  getQuote(randomDate);

  // `getWeather` may fail if the API is retired or deprecated
  getWeather();
});

// Generate a random date
function getRandomDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomTime = Math.random() * (end.getTime() - start.getTime()) + start.getTime();
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0];
}