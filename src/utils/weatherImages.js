// Weather image mapping utility - using only 5 essential weather icons
export const getWeatherImage = (weatherCondition, timeOfDay = 'day') => {
  const basePath = '../assets/';
  
  // Map OpenWeatherMap weather conditions to our 5 essential images
  const weatherMap = {
    // Clear sky
    '01d': 'ClearDay.svg', // clear sky day
    '01n': 'ClearNight.svg', // clear sky night
    
    // Few clouds
    '02d': 'MostlySunnyDay.svg', // few clouds day
    '02n': 'ClearNight.svg', // few clouds night
    
    // Scattered clouds
    '03d': 'PartlyCloudyDay.svg', // scattered clouds day
    '03n': 'PartlyCloudyNight.svg', // scattered clouds night
    
    // Broken clouds
    '04d': 'CloudyDay.svg', // broken clouds day
    '04n': 'CloudyNight.svg', // broken clouds night
    
    // Shower rain
    '09d': 'LightRain.svg', // shower rain day
    '09n': 'LightRainNight.svg', // shower rain night
    
    // Rain
    '10d': 'RainDay.svg', // rain day
    '10n': 'RainNight.svg', // rain night
    
    // Thunderstorm - fallback to rain
    '11d': 'RainDay.svg', // thunderstorm day
    '11n': 'RainNight.svg', // thunderstorm night
    
    // Snow - fallback to cloudy
    '13d': 'CloudyDay.svg', // snow day
    '13n': 'CloudyNight.svg', // snow night
    
    // Mist - fallback to cloudy
    '50d': 'CloudyDay.svg', // mist day
    '50n': 'CloudyNight.svg', // mist night
  };

  // Fallback mapping based on weather description
  const descriptionMap = {
    'clear': timeOfDay === 'night' ? 'ClearNight.svg' : 'ClearDay.svg',
    'sunny': 'MostlySunnyDay.svg',
    'mostly sunny': 'MostlySunnyDay.svg',
    'partly cloudy': timeOfDay === 'night' ? 'PartlyCloudyNight.svg' : 'PartlyCloudyDay.svg',
    'cloudy': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'overcast': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'rain': timeOfDay === 'night' ? 'RainNight.svg' : 'RainDay.svg',
    'light rain': timeOfDay === 'night' ? 'LightRainNight.svg' : 'LightRain.svg',
    'heavy rain': timeOfDay === 'night' ? 'RainNight.svg' : 'RainDay.svg',
    'thunderstorm': timeOfDay === 'night' ? 'RainNight.svg' : 'RainDay.svg',
    'snow': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'light snow': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'fog': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'mist': timeOfDay === 'night' ? 'CloudyNight.svg' : 'CloudyDay.svg',
    'wind': 'WindyV2.svg',
    'windy': 'WindyV2.svg',
  };

  // Try to get image from weather code first
  let imageName = weatherMap[weatherCondition];
  
  // If not found, try description mapping
  if (!imageName && weatherCondition) {
    const lowerCondition = weatherCondition.toLowerCase();
    imageName = descriptionMap[lowerCondition];
  }
  
  // Default fallback
  if (!imageName) {
    imageName = timeOfDay === 'night' ? 'ClearNight.svg' : 'MostlySunnyDay.svg';
  }

  return new URL(`../assets/${imageName}`, import.meta.url).href;
};

// Helper function to determine if it's day or night
export const getTimeOfDay = (timestamp) => {
  const hour = new Date(timestamp).getHours();
  return hour >= 6 && hour < 18 ? 'day' : 'night';
};
