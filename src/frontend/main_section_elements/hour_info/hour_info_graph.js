const graph = document.querySelector('.hours-info-graph');

function createHourElements(hours) {
  graph.innerHTML = '';

  hours.forEach((_, index) => {
    const hourElement = document.createElement('div');
    hourElement.className = 'hour';
    hourElement.id = index;

    graph.append(hourElement);
  });
}

function fillHourElements(hours, weatherType, tempMode) {
  const hourElements = document.querySelectorAll('.hour');

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

export function showTempGraph(hours, tempMode) {
  createHourElements(hours);
  fillHourElements(hours, 'temp', tempMode);
}

export function showHumidityGraph(hours) {
  fillHourElements(hours, 'humidity');
}

export function showCloudGraph(hours) {
  fillHourElements(hours, 'cloud');
}
