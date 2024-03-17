import { getTempMode } from '../../../backend/temp_mode';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import {
  showCloudGraph,
  showHumidityGraph,
  showTempGraph,
} from './hour_info_graph';

const hoursInfoMode = document.querySelector('.hours-info-mode');

hoursInfoMode.addEventListener('click', (e) => {
  const hours = getLastFetchedWeather().hours;

  switch (e.target.className) {
    case 'hours-temperature':
      showTempGraph(hours, getTempMode());
      break;

    case 'hours-humidity':
      showHumidityGraph(hours);
      break;

    case 'hours-clouds':
      showCloudGraph(hours);
      break;
  }
});
