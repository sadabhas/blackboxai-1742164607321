// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const errorMsg = document.getElementById('error-msg');
const loadingIndicator = document.getElementById('loading');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

// Weather API configuration
const API_KEY = '1234567890'; // Note: In a real application, this would be securely stored
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Main search handler
async function handleSearch() {
    const location = locationInput.value.trim();
    if (!location) {
        showError('Please enter a location');
        return;
    }

    showLoading(true);
    hideError();

    try {
        // Fetch current weather
        const weatherData = await fetchWeatherData(location);
        displayCurrentWeather(weatherData);

        // Fetch 5-day forecast
        const forecastData = await fetchForecastData(location);
        displayForecast(forecastData);

        showLoading(false);
        currentWeather.classList.remove('hidden');
        forecast.classList.remove('hidden');
    } catch (error) {
        showError('Unable to fetch weather data. Please try again.');
        showLoading(false);
    }
}

// Fetch current weather data
async function fetchWeatherData(location) {
    // For demo purposes, return mock data
    return {
        name: location,
        main: {
            temp: 20,
            feels_like: 22,
            humidity: 65
        },
        weather: [{ description: 'Partly cloudy' }],
        wind: { speed: 5 }
    };
}

// Fetch forecast data
async function fetchForecastData(location) {
    // For demo purposes, return mock data
    return {
        list: Array(5).fill(null).map((_, index) => ({
            dt: Date.now() + (index * 86400000),
            main: {
                temp: 20 + Math.random() * 5,
                humidity: 65 + Math.random() * 10
            },
            weather: [{ description: 'Partly cloudy' }]
        }))
    };
}

// Display current weather
function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
}

// Display forecast
function displayForecast(data) {
    forecast.innerHTML = '';
    
    data.list.forEach((day) => {
        const date = new Date(day.dt);
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md p-4 transform transition duration-300 hover:scale-105';
        
        card.innerHTML = `
            <h3 class="font-semibold text-gray-800">${date.toLocaleDateString('en-US', { weekday: 'short' })}</h3>
            <div class="my-2">
                <div class="text-2xl font-bold text-gray-800">${Math.round(day.main.temp)}°C</div>
                <p class="text-gray-500">${day.weather[0].description}</p>
            </div>
            <div class="text-sm text-gray-500">
                <p>Humidity: ${day.main.humidity}%</p>
            </div>
        `;
        
        forecast.appendChild(card);
    });
}

// Utility functions
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

function hideError() {
    errorMsg.classList.add('hidden');
}

function showLoading(show) {
    if (show) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // You could add initialization logic here
    // For example, getting user's location via geolocation
});
