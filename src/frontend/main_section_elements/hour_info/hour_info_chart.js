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
    // commonChartOptions should go before our custom options obj
    // and as we do not want to override it, we use an empty obj first
    options: Object.assign({}, commonChartOptions, {
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
    }),
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
    options: Object.assign({}, commonChartOptions, {
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
          min: (context) => {
            // need to copy hoursData to not sort the original array
            const hoursDataCopy = hoursData.map((el) => el);
            const sortedHoursData = hoursDataCopy.sort((a, b) => a - b);
            switch (getTempMode()) {
              case '0':
                return sortedHoursData[0] < 0 ? sortedHoursData[0] - 2 : null;

              case '1':
                return sortedHoursData[0] < 32 ? sortedHoursData[0] - 4 : null;
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
            label: function (context) {
              let label = context.parsed.y;

              if (isNaN(label)) return;

              switch (getTempMode()) {
                case '0':
                  label += ' °C';
                  break;

                case '1':
                  label += ' °F';
                  break;
              }

              return label;
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
                return temp[index] < 32 ? 'start' : 'end';
            }
          },
        },
      },

      onHover: (e, item) => {
        if (!item.length) return;
        const hourIndex = item[0].index;
        showWeatherInfo(hours[hourIndex]);
        showTime(hours[hourIndex].time);
      },
    }),
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
