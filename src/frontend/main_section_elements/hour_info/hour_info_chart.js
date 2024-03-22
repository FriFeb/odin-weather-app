import Chart from 'chart.js/auto';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';

let chart;

Chart.register({
  id: 'chartDefaultWeather',
  beforeEvent(chart, args, pluginOptions) {
    const event = args.event;
    if (event.type === 'mouseout') {
      showWeatherInfo(getLastFetchedWeather().day);
      showTime(getLastFetchedWeather().location.time);
    }
  },
});

function showChart(hours, hoursData) {
  chart = new Chart(document.getElementById('chart'), {
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
      fill: true,
      aspectRatio: 4,
      interaction: {
        intersect: false,
        mode: 'nearest',
        axis: 'x',
      },
      pointRadius: 10,
      hoverBorderWidth: 12,
      hoverBorderColor: 'green',
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

  if (chart) chart.destroy();
  showChart(hours, hoursData);
}

export function showHumidityChart(hours) {
  const hoursData = hours.map((hour) => hour.humidity);

  if (chart) chart.destroy();
  showChart(hours, hoursData);
}

export function showCloudChart(hours) {
  const hoursData = hours.map((hour) => hour.cloud);

  if (chart) chart.destroy();
  showChart(hours, hoursData);
}
