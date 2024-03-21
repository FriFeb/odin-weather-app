import Chart from 'chart.js/auto';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';

function showChart(hours, hoursData) {
  new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: hours.map((hour) => hour.time.split(' ')[1]),
      datasets: [
        {
          data: hoursData,
        },
      ],
    },
    options: {
      elements: {
        point: {
          pointRadius: 10,
          hoverBorderWidth: 12,
          hoverBorderColor: 'green',
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      onHover: (e, item) => {
        if (!item.length) return;
        const hourIndex = item[0].index;
        showWeatherInfo(hours[hourIndex]);
        showTime(hours[hourIndex].time);
      },

      /*
      chart.addEventListener('mouseout', () => {
        showWeatherInfo(getLastFetchedWeather().day);
        showTime(getLastFetchedWeather().location.time);
      });
      */
    },
  });
}

export function showTempChart(hours, tempMode) {
  let hoursData;

  switch (tempMode) {
    case '0':
      hoursData = hours.map((hour) => hour.temp.temp_C);
      break;

    case '1':
      hoursData = hours.map((hour) => hour.temp.temp_F);
      break;
  }

  showChart(hours, hoursData);
}

export function showHumidityChart(hours) {}

export function showCloudChart(hours) {}
