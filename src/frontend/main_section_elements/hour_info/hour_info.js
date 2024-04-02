import { getTempMode } from '../../../backend/temp_mode';
import {
  showCloudChart,
  showHumidityChart,
  showTempChart,
  showUvIndexChart,
} from './hour_info_chart';
import {
  activateHourInfoModeElement,
  deactivateHourInfoModeElements,
} from './hour_info_mode_elements';

function getDefaultHourInfoModeElement() {
  return document.querySelector('[data-hour-info-mode="temperature"]');
}

function toggleHourInfoModeElement(hourInfoModeElement) {
  deactivateHourInfoModeElements();
  activateHourInfoModeElement(hourInfoModeElement);
}

export default function showHourInfo(
  hours,
  hourInfoMode,
  hourInfoModeElement = getDefaultHourInfoModeElement()
) {
  toggleHourInfoModeElement(hourInfoModeElement);

  switch (hourInfoMode) {
    case 'temperature':
      showTempChart(hours, getTempMode());
      break;

    case 'humidity':
      showHumidityChart(hours);
      break;

    case 'cloud':
      showCloudChart(hours);
      break;

    case 'uv-index':
    default:
      showUvIndexChart(hours);
      break;
  }
}
