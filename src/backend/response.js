import API_KEY from './constants';

export default async function getApiResponseWeather(endpoint, location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/${endpoint}?q=${location}&key=${API_KEY}`
  );

  const weather = await response.json();

  if (weather.error) throw new Error(weather.error.message);

  return weather;
}
