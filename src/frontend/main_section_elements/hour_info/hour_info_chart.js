import Chart from 'chart.js/auto';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';
import { getTempMode } from '../../../backend/temp_mode';
import {
  commonChartOptions,
  pickTempModeEnvironmentColor,
  pickUvEnvironmentColor,
} from './hour_info_chart_utils';
import setEnvironmentColors from '../../root';

let chart;

function showUvLineChart(hours, hoursData) {
  chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: hours.map((hour) => hour.time.split(' ')[1]),
      datasets: [
        {
          data: hoursData,
          segment: {
            borderColor: (context) => pickUvEnvironmentColor(context, 1),
            backgroundColor: (context) => pickUvEnvironmentColor(context, 0.2),
          },
          spanGaps: true,
        },
      ],
    },
    options: {
      ...commonChartOptions,
      ...{
        fill: true,
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 15,
        pointBackgroundColor: (context) => pickUvEnvironmentColor(context, 1),
        pointBorderColor: (context) => pickUvEnvironmentColor(context, 1),

        plugins: {
          tooltip: {
            enabled: false,
          },
        },

        scales: {
          x: {
            border: {
              width: 0,
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 16,
              },
              padding: 10,
            },
          },
          y: {
            border: {
              width: 0,
            },
            min: 0,
            suggestedMax: 12,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },

        onHover: (e, item) => {
          if (!item.length) return;
          const hourIndex = item[0].index;
          const targetHour = hours[hourIndex];

          setEnvironmentColors(targetHour);

          showWeatherInfo(targetHour);
          showTime(targetHour.time);
        },
      },
    },
  });
}

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
    options: {
      ...commonChartOptions,
      ...{
        categoryPercentage: 1.0,
        barPercentage: 1.0,

        borderWidth: {
          top: 4,
        },

        hoverBorderWidth: {
          top: 6,
        },

        scales: {
          x: {
            border: {
              width: 0,
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 16,
              },
              padding: 10,
            },
          },
          y: {
            border: {
              width: 0,
            },
            min: 0,
            suggestedMax: 100,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },

        plugins: {
          tooltip: {
            callbacks: {
              labelColor: () => ({
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 0,
              }),
              label: (context) => {
                const labelText = context.parsed.y || '';
                return `${labelText} %`;
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
    },
  });
}

function showTempLineChart(hours, hoursData) {
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
    options: {
      ...commonChartOptions,
      ...{
        fill: true,
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 15,
        pointBackgroundColor: (context) =>
          pickTempModeEnvironmentColor(context, 1),
        pointBorderColor: (context) => pickTempModeEnvironmentColor(context, 1),

        scales: {
          x: {
            border: {
              width: 0,
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 16,
              },
              padding: 10,
            },
          },
          y: {
            border: {
              width: 0,
            },
            // Setting min value below the lowest hoursData value
            // to make sure that the temperature values below 0 C
            // do not overlap with ticks labels
            min: () => {
              // need to copy hoursData to not sort the original array
              const hoursDataCopy = hoursData.map((el) => el);
              const sortedHoursData = hoursDataCopy.sort((a, b) => a - b);
              switch (getTempMode()) {
                case '0':
                  return sortedHoursData[0] < 0 ? sortedHoursData[0] - 2 : null;

                case '1':
                default:
                  return sortedHoursData[0] < 32
                    ? sortedHoursData[0] - 4
                    : null;
              }
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },

        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                let labelText = context.parsed.y;

                switch (getTempMode()) {
                  case '0':
                    labelText += ' °C';
                    break;

                  case '1':
                  default:
                    labelText += ' °F';
                    break;
                }

                return labelText;
              },
            },
          },
          datalabels: {
            align: (ctx) => {
              const index = ctx.dataIndex;
              const temp = ctx.dataset.data;

              switch (getTempMode()) {
                case '0':
                  return temp[index] < 0 ? 'start' : 'end';

                case '1':
                default:
                  return temp[index] < 32 ? 'start' : 'end';
              }
            },
            anchor: (ctx) => {
              const index = ctx.dataIndex;
              const temp = ctx.dataset.data;
              switch (getTempMode()) {
                case '0':
                  return temp[index] < 0 ? 'start' : 'end';

                case '1':
                default:
                  return temp[index] < 32 ? 'start' : 'end';
              }
            },
          },
        },

        onHover: (e, item) => {
          if (!item.length) return;
          const hourIndex = item[0].index;
          const targetHour = hours[hourIndex];

          setEnvironmentColors(targetHour);

          showWeatherInfo(targetHour);
          showTime(targetHour.time);
        },
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
    default:
      hoursData = hours.map((hour) => hour.temp.temp_F);
      break;
  }

  if (chart) chart.destroy();
  showTempLineChart(hours, hoursData);
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

export function showUvIndexChart(hours) {
  const hoursData = hours.map((hour) => hour.uv);

  if (chart) chart.destroy();
  showUvLineChart(hours, hoursData);
}
