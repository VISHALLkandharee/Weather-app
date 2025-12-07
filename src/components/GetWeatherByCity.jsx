import React from "react";

async function getCityCoordinates(city) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e961d111fa2aef7dc057d5bd992acc81`
  );

  if (!response.ok) throw new Error("Error fetching city coordinates");
  const data = await response.json();
  if (data.length === 0) throw new Error("City not found");
  return { name: data[0].name, lat: data[0].lat, lon: data[0].lon };
}

async function getWeatherByCoordinates(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e961d111fa2aef7dc057d5bd992acc81&units=metric`
  );

  if (!response.ok) throw new Error("Error fetching weather data");
  return response.json();
}

const GetWeatherByCity = async ({ city }) => {
  const { name, lat, lon } = await getCityCoordinates(city);
  const weatherData = await getWeatherByCoordinates(lat, lon);

  console.log("City:", name);
  console.log("Weather Data:", weatherData);

  return { weatherData, city: name };
};

export default GetWeatherByCity;
