const apiKey = "API_KEY"; // Replace with your actual API key

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
// ...existing code...
function displayWeather(data) {
  const weatherOutput = document.getElementById("displayData");
  const weatherInfo = `
    <div class="bg-sky-50 rounded-xl shadow-lg p-6 flex flex-col items-center">
      <div class="flex items-center gap-4 mb-4">
        <img class="w-20 h-20" src="${data.current.condition.icon}" alt="Weather icon">
        <div>
          <h2 class="text-2xl font-bold text-sky-800">${data.location.name}, ${data.location.country}</h2>
          <p class="text-sky-600 text-sm">${data.location.region} | ${data.location.tz_id}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full text-sky-700 text-lg">
        <div>
          <span class="font-semibold">Temperature:</span> ${data.current.temp_c}°C
        </div>
        <div>
          <span class="font-semibold">Condition:</span> ${data.current.condition.text}
        </div>
        <div>
          <span class="font-semibold">Humidity:</span> ${data.current.humidity}%
        </div>
        <div>
          <span class="font-semibold">Wind:</span> ${data.current.wind_mph} mph
        </div>
        <div>
          <span class="font-semibold">Cloud:</span> ${data.current.cloud}%
        </div>
        <div>
          <span class="font-semibold">Local Time:</span> ${data.location.localtime}
        </div>
      </div>
      <p class="mt-4 text-xs text-sky-500">Last updated: ${data.current.last_updated}</p>
    </div>
  `;
  weatherOutput.innerHTML = weatherInfo;
}
// ...existing code...