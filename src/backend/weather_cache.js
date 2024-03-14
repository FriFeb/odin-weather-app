import { setLastFetchedWeather } from './last_fetched_weather';
import { getRequiredWeather } from './weather_handler';

const weatherCache = {};

export async function getWeather(location) {
  if (!weatherCache[location]) {
    const weather = await getRequiredWeather(location);
    weatherCache[location] = weather;
  }

  setLastFetchedWeather(weatherCache[location]);
  return weatherCache[location];
}
