import Chart from 'chart.js/auto';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';
import { getTempMode } from '../../../backend/temp_mode';
import {
  commonChartOptions,
  pickTempModeEnvironmentColor,
} from './hour_info_chart_utils';

let chart;

function showBarChart(hours, hoursData) {
  chart = new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
      labels: hours.map((hour) => hour.time.split(' ')[1]),
      datasets: [
        {
          data: hoursData,
        },
      ],
    },
    options: Object.assign(
      {
        categoryPercentage: 1.0,
        barPercentage: 1.0,

        borderWidth: {
          top: 4,
        },

        hoverBorderWidth: {
          top: 8,
        },

        scales: {
          y: {
            min: 0,
            suggestedMax: 100,
          },
        },

        plugins: {
          tooltip: {
            callbacks: {
              labelColor: (context) => {
                return {
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 0,
                };
              },
              label: function (context) {
                let label = context.parsed.y || '';

                return `${label} %`;
              },
            },
          },
        },

        onHover: (e, item) => {
          if (!item.length) return;
          const hourIndex = item[0].index;
          showWeatherInfo(hours[hourIndex]);
          showTime(hours[hourIndex].time);
        },
      },
      commonChartOptions
    ),
  });
}

function showLineChart(hours, hoursData) {
  chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: hours.map((hour) => hour.time.split(' ')[1]),
      datasets: [
        {
          data: hoursData,
          segment: {
            borderColor: (context) => pickTempModeEnvironmentColor(context, 1),
            backgroundColor: (context) =>
              pickTempModeEnvironmentColor(context, 0.2),
          },
          spanGaps: true,
        },
      ],
    },
    options: Object.assign(
      {
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        pointHoverRadius: 15,
        pointBackgroundColor: (context) =>
          pickTempModeEnvironmentColor(context, 1),
        pointBorderColor: (context) => pickTempModeEnvironmentColor(context, 1),

        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.parsed.y || '';

                if (label) {
                  switch (getTempMode()) {
                    case '0':
                      label += ' °C';
                      break;

                    case '1':
                      label += ' °F';
                      break;
                  }
                }

                return label;
              },
            },
          },
          datalabels: {
            align: (ctx) => {
              const index = ctx.dataIndex;
              const temp = ctx.dataset.data;
              return temp[index] < 0 ? 'start' : 'end';
            },
            anchor: (ctx) => {
              const index = ctx.dataIndex;
              const temp = ctx.dataset.data;
              return temp[index] < 0 ? 'start' : 'end';
            },
          },
        },
      },
      commonChartOptions
    ),
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
  showLineChart(hours, hoursData);
}

export function showHumidityChart(hours) {
  const hoursData = hours.map((hour) => hour.humidity);

  if (chart) chart.destroy();
  showBarChart(hours, hoursData);
}

export function showCloudChart(hours) {
  const hoursData = hours.map((hour) => hour.cloud);

  if (chart) chart.destroy();
  showBarChart(hours, hoursData);
}
