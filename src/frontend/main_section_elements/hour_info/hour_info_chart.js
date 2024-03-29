import Chart from 'chart.js/auto';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';

let chart;

Chart.defaults.font.size = 20;
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

function pickColor(ctx) {
  if (!ctx.parsed.y) debugger;
  const y = ctx.parsed.y;
  return y < 0 ? 'blue' : 'red';
}

function adjustRadiusBasedOnData(ctx) {
  const v = ctx.parsed.y;
  return v < 10 ? 5 : v < 15 ? 7 : v < 20 ? 9 : v < 25 ? 11 : 15;
}

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
      stepped: 'middle',
      aspectRatio: 4,
      pointRadius: 0,
      pointHoverRadius: 15,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.3)',

      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 16,
            },
          },
        },
        y: {
          grid: {
            lineWidth: 1,
            color: 'rgba(200, 200, 200, 0.8)',
          },
          min: 0,
          suggestedMax: 100,
        },
      },

      interaction: {
        intersect: false,
        mode: 'nearest',
        axis: 'x',
      },

      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          padding: 12,
          caretPadding: 15,
          caretSize: 12,
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

function showTChart(hours, hoursData) {
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
      tension: 0.5,
      aspectRatio: 4,
      pointRadius: 0,
      pointHoverRadius: 15,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.3)',

      // borderColor: pickColor,
      // elements: {
      //   point: {
      //     radius: adjustRadiusBasedOnData,
      //   },
      // },

      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 16,
            },
          },
        },
        y: {
          grid: {
            lineWidth: 1,
            color: 'rgba(200, 200, 200, 0.8)',
          },
        },
      },

      interaction: {
        intersect: false,
        mode: 'nearest',
        axis: 'x',
      },

      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          padding: 12,
          caretPadding: 15,
          caretSize: 12,
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
  showTChart(hours, hoursData);
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
