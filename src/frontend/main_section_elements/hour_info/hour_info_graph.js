import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showWeatherInfo } from '../weather_info';

const graph = document.querySelector('.hours-info-graph');
let hourElements;

function createHourElements(hours) {
  graph.innerHTML = '';

  hours.forEach((_, index) => {
    const hourElement = document.createElement('div');
    hourElement.className = 'hour';
    hourElement.id = index;

    graph.append(hourElement);
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
      console.log('hourElement mouseover' + e.target);
      const hourIndex = e.target.id;
      showWeatherInfo(hours[hourIndex]);
    });
  });

  graph.addEventListener('mouseout', (e) => {
    showWeatherInfo(getLastFetchedWeather().day);
  });
}

export function showTempGraph(hours, tempMode) {
  createHourElements(hours);
  fillHourElements(hours, 'temp', tempMode);
  addHourWeatherInfoEvents(hours);
}

export function showHumidityGraph(hours) {
  fillHourElements(hours, 'humidity');
}

export function showCloudGraph(hours) {
  fillHourElements(hours, 'cloud');
}
