import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showHourInfo } from './hour_info';

const hoursInfoMode = document.querySelector('.hours-info-mode');

hoursInfoMode.addEventListener('click', (e) => {
  const hourInfoMode = e.target.dataset.hourInfoMode;

  if (!hourInfoMode) return;

  const hours = getLastFetchedWeather().hours;

  showHourInfo(hours, hourInfoMode, e.target.closest('li'));
});
