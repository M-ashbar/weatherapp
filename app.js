// Get elements from the DOM
const cityInput = document.getElementById('city');
const weatherInfoDiv = document.getElementById('weatherInfo');
const getWeatherBtn = document.getElementById('getWeatherBtn');

// OpenWeatherMap API Key and Base URL
const API_KEY = 'd2d500d4a4af7c2dac7c6e1c98d4fa6b';  // Replace with your actual OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            weatherInfoDiv.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfoDiv.innerHTML = `<p>Unable to fetch data. Please try again later.</p>`;
    }
}

// Function to display weather info
function displayWeather(data) {
    const { name, weather, main } = data;
    const weatherDescription = weather[0].description;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Condition:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}

// Event listener for button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherInfoDiv.innerHTML = `<p>Please enter a city name.</p>`;
    }
});
