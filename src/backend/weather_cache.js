import { getRequiredWeather } from './weather_handler';

const weatherCache = {};
let lastFetchedLocation;

export async function getWeather(location) {
  if (!weatherCache[location]) {
    const weather = await getRequiredWeather(location);
    weatherCache[location] = weather;
  }

  lastFetchedLocation = location;
  return weatherCache[location];
}

export function getLastFetchedWeather() {
  return weatherCache[lastFetchedLocation];
}
