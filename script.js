const searchInput = document.querySelector(".search-input");
const currentWeatherDiv = document.querySelector(".current-weather");

const API_KEY = "ed3184f2748848c8bd080043252101";

// Weather codes for mapping to custom icons
const weatherCodes = {
    clear: [1000],  // Clear sky
    partly_cloudy: [1003],  // Partly cloudy
    mist: [1030, 1135, 1147],  // Mist
    rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],  // Light to moderate rain
    moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],  // Heavy rain
    snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],  // Snow
    thunder: [1087, 1279, 1282],  // Thunderstorm
    thunder_rain: [1273, 1276],  // Thunderstorms with rain
    freezing_rain: [1073, 1187, 1190, 1196],  // Freezing rain
    heavy_snow: [1114, 1117, 1204, 1207],  // Heavy snow
    snow_showers: [1210, 1213, 1216, 1219, 1222, 1225],  // Snow showers
    light_showers: [1180, 1183, 1186, 1198, 1199],  // Light showers
    heavy_showers: [1201, 1207, 1210, 1213],  // Heavy showers
    fog: [1132, 1135],  // Foggy
    windy: [1072, 1087, 1138],  // Windy weather
    cloudy:  [1006, 1009],  // Cloudy
    clear_night: [1000, 1100],  // Clear night
    overcast: [1006, 1009, 1103, 1106],  // Overcast
    dust: [1135],  // Dust
    sand: [1168, 1171],  // Sand
    haze: [1135, 1139],  // Haze
    tropical_storm: [1219, 1222],  // Tropical storm
}

const getWeatherDetails = async (cityName) => {
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`;

    try {
        // Fetch weather data from the API and parse the response as JSON
        const response = await fetch(API_URL);
        const data = await response.json();

        // Extract current weather details
        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherCode = data.current.condition.code;

        // Find the appropriate weather icon based on the weather code
        const weatherIcon = Object.keys(weatherCodes).find(icon =>
            weatherCodes[icon].includes(weatherCode)
        );

        // If no icon is found, default to a generic icon (you may change this)
        const icon = weatherIcon ? weatherIcon : 'clear';

        // Update the current weather display
        currentWeatherDiv.querySelector(".weather-icon").src = `icons/${icon}.svg`;
        currentWeatherDiv.querySelector(".temperature").innerHTML = `${temperature}<span>&deg;C</span>`;
        currentWeatherDiv.querySelector(".description").innerText = description;

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Handle user input in the search box
searchInput.addEventListener("keyup", (e) => {
    const cityName = searchInput.value.trim();

    if (e.key === "Enter" && cityName) {
        getWeatherDetails(cityName);
    }
});
