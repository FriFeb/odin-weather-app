import { showTemperature } from './day_info';
import { getLastFetchedWeather } from '../backend/weather_cache';

const tempMode = document.querySelector('#temperature-mode');

tempMode.addEventListener('change', () => {
  const lastFetchedWeather = getLastFetchedWeather();

  showTemperature(lastFetchedWeather.day.temp, getTempMode());
});

export function getTempMode() {
  return tempMode.value;
}
