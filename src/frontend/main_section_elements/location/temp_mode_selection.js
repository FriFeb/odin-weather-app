import { showTemperature } from '../weather_info';
import { getTempMode, setTempMode } from '../../../backend/temp_mode';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import {
  activateTempModeElement,
  deactivateTempModeElements,
} from './temp_mode_elements';
import showHourInfo from '../hour_info/hour_info';

const tempModeSelection = document.querySelector('.temperature-selection');

function toggleTempModeElement(tempModeElement) {
  deactivateTempModeElements();
  activateTempModeElement(tempModeElement);
}

tempModeSelection.addEventListener('click', (e) => {
  const newTempMode = e.target.dataset.temperatureMode;

  if (!newTempMode) return;

  setTempMode(newTempMode);

  toggleTempModeElement(e.target.closest('div'));

  const lastFetchedWeather = getLastFetchedWeather();
  showTemperature(lastFetchedWeather.day.temp, getTempMode());
  showHourInfo(lastFetchedWeather.hours, 'temperature');
});
