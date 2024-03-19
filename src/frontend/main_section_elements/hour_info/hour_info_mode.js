import { getTempMode } from '../../../backend/temp_mode';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import {
  showCloudGraph,
  showHumidityGraph,
  showTempGraph,
} from './hour_info_chart';
import {
  activateHourInfoModeElement,
  deactivateHourInfoModeElements,
} from './hour_info_mode_elements';

const hoursInfoMode = document.querySelector('.hours-info-mode');

hoursInfoMode.addEventListener('click', (e) => {
  const hourInfoMode = e.target.dataset.hourInfoMode;

  if (!hourInfoMode) return;

  const hours = getLastFetchedWeather().hours;

  deactivateHourInfoModeElements();

  switch (hourInfoMode) {
    case 'temperature':
      showTempGraph(hours, getTempMode());
      break;

    case 'humidity':
      showHumidityGraph(hours);
      break;

    case 'cloud':
      showCloudGraph(hours);
      break;
  }

  activateHourInfoModeElement(e.target.closest('li'));
});
