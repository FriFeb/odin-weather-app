import { showTemperature } from './day_info';
import { getLastFetchedWeather } from '../backend/last_fetched_weather';

const tempMode = document.querySelector('#temperature-mode');

tempMode.addEventListener('change', () => {
  const lastFetchedWeather = getLastFetchedWeather();

  showTemperature(lastFetchedWeather.day.temp, getTempMode());
});

export function getTempMode() {
  return tempMode.value;
}
