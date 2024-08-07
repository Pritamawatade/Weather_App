const apiKey = "964cc5a284a14f10b8b131851240508"; // Replace with your actual API key

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  if (!location) {
    alert("Please enter a location");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    alert("Failed to fetch weather data. Please try again.");
  }
}

function displayWeather(data) {
  const weatherOutput = document.getElementById("displayData");
  const weatherInfo = `
  <div>
  <h1 class="text-white text-3xl font-lg">Weather in ${data.location.name}, ${data.location.country}</h1>
  <p class="text-white text-3xl font-lg">city: ${data.location.name}</p>
  <p class="text-white text-3xl font-lg">State: ${data.location.region}</p>
  <p class="text-white text-3xl font-lg">Time Zone: ${data.location.tz_id}</p>
  <p class="text-white text-3xl font-lg">Wind MPH: ${data.current.wind_mph}</p>
  <p class="text-white text-3xl font-lg">Last updated: ${data.current.last_updated}</p>
  <p class="text-white text-3xl font-lg">cloud : ${data.current.cloud}</p>
  <p class="text-white text-3xl font-lg">LocalTime: ${data.location.localtime}</p>
  
  <p class="text-white text-3xl font-lg">Humidity: ${data.current.humidity}</p>
  <p class="text-white text-3xl font-lg" >Temperature: ${data.current.temp_c}°C</p>
  <p class="text-white text-3xl font-lg">Condition: ${data.current.condition.text}</p>
  <img class="h-88 img-fluid" src="${data.current.condition.icon}" alt="Weather icon">
  </div>
    `;
  weatherOutput.innerHTML = weatherInfo;
}
