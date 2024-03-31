import { getLastFetchedWeather } from '../../../backend/weather_cache';
import showHourInfo from './hour_info';

const hoursInfoMode = document.querySelector('.hours-info-mode');

hoursInfoMode.addEventListener('click', (e) => {
  const { hourInfoMode } = e.target.dataset;

  if (!hourInfoMode) return;

  const lastFetchedWeather = getLastFetchedWeather();
  const { hours } = lastFetchedWeather;

  showHourInfo(hours, hourInfoMode, e.target.closest('li'));
});
