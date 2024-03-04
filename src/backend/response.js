import API_KEY from './constants';

export async function getApiResponseWeather(endpoint, location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/${endpoint}?q=${location}&key=${API_KEY}`
    );
    const weather = await response.json();
    return weather;
  } catch (err) {
    console.log(err);
  }
}
