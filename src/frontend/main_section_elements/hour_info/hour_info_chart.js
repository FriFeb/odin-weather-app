import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';
import {
  activateHourInfoModeElement,
  deactivateHourInfoModeElements,
} from './hour_info_mode_elements';

const chart = document.querySelector('.hours-info-chart');
let hourElements;

function createHourElements(hours) {
  chart.innerHTML = '';

  hours.forEach((_, index) => {
    const hourElement = document.createElement('div');
    hourElement.className = 'hour';
    hourElement.id = index;

    chart.append(hourElement);
  });

  hourElements = document.querySelectorAll('.hour');
}

function fillHourElements(hours, weatherType, tempMode) {
  hourElements.forEach((hourElement, index) => {
    const hour = hours[index];
    const hourWeather = hour[weatherType];

    if (weatherType === 'temp') {
      switch (tempMode) {
        case '0':
          hourElement.innerHTML = hourWeather.temp_C;
          break;
        case '1':
          hourElement.innerHTML = hourWeather.temp_F;
          break;
      }
    } else {
      hourElement.innerHTML = hourWeather;
    }
  });
}

function addHourWeatherInfoEvents(hours) {
  hourElements.forEach((hourElement) => {
    hourElement.addEventListener('mouseover', (e) => {
      const hourIndex = e.target.id;
      showWeatherInfo(hours[hourIndex]);
      showTime(hours[hourIndex].time);
    });
  });

  chart.addEventListener('mouseout', () => {
    showWeatherInfo(getLastFetchedWeather().day);
    showTime(getLastFetchedWeather().location.time);
  });
}

export function showTempGraph(hours, tempMode) {
  createHourElements(hours);
  fillHourElements(hours, 'temp', tempMode);
  addHourWeatherInfoEvents(hours);

  deactivateHourInfoModeElements();
  activateHourInfoModeElement(
    document.querySelector('[data-hour-info-mode="temperature"]')
  );
}

export function showHumidityGraph(hours) {
  fillHourElements(hours, 'humidity');
}

export function showCloudGraph(hours) {
  fillHourElements(hours, 'cloud');
}
