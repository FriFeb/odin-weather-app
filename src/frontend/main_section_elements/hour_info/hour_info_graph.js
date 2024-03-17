const graph = document.querySelector('.hours-info-graph');

export function showTempGraph(hours, mode) {
  graph.innerHTML = '';

  hours.forEach((hour) => {
    const hourElement = document.createElement('div');

    switch (mode) {
      case '0':
        hourElement.innerHTML = hour.temp.temp_C;
        break;

      case '1':
        hourElement.innerHTML = hour.temp.temp_F;
        break;
    }

    graph.append(hourElement);
  });
}

export function showHumidityGraph(hours) {
  graph.innerHTML = '';

  hours.forEach((hour) => {
    const hourElement = document.createElement('div');

    hourElement.innerHTML = hour.humidity;

    graph.append(hourElement);
  });
}

export function showCloudGraph(hours) {
  graph.innerHTML = '';

  hours.forEach((hour) => {
    const hourElement = document.createElement('div');

    hourElement.innerHTML = hour.cloud;

    graph.append(hourElement);
  });
}
