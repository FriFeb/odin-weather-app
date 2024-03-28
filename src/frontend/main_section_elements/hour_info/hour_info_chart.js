import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';
import { getTempMode } from '../../../backend/temp_mode';

let chart;

Chart.defaults.font.size = 20;
Chart.register(ChartDataLabels);
Chart.register({
  id: 'chartDefaultWeather',
  beforeEvent(chart, args) {
    const event = args.event;
    if (event.type === 'mouseout') {
      showWeatherInfo(getLastFetchedWeather().day);
      showTime(getLastFetchedWeather().location.time);
    }
  },
});

function pickColor(environment, alpha) {
  const blue = `rgba(54, 162, 235, ${alpha})`;
  const yellow = `rgba(255, 205, 86, ${alpha})`;

  switch (environment) {
    case 'cold':
      return blue;

    case 'warm':
      return yellow;
  }
}

function pickEnvironmentColor(ctx, alpha) {
  let y = ctx.p0?.parsed.y;
  if (!y) y = ctx.parsed.y;

  switch (getTempMode()) {
    case '0':
      return y < 0 ? pickColor('cold', alpha) : pickColor('warm', alpha);

    case '1':
      return y < 32 ? pickColor('cold', alpha) : pickColor('warm', alpha);
  }
}

function showChart(hours, hoursData) {
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
      aspectRatio: 4,
      pointRadius: 0,
      pointHoverRadius: 15,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      categoryPercentage: 1.0,
      barPercentage: 1.0,
      borderWidth: {
        top: 4,
      },

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
          caretSize: 12,
          boxPadding: 3,
          caretPadding: 15,
          bodyAlign: 'center',
          titleAlign: 'center',
          borderWidth: 0,
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
        datalabels: {
          font: {
            weight: 'bold',
          },
          align: 'top',
          anchor: 'end',
          offset: 2,
          // formatter: (value) => `${value} %`,
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
          segment: {
            borderColor: (context) => pickEnvironmentColor(context, 1),
            backgroundColor: (context) => pickEnvironmentColor(context, 0.3),
          },
          spanGaps: true,
        },
      ],
    },
    options: {
      fill: true,
      tension: 0.5,
      aspectRatio: 4,
      pointRadius: 0,
      pointHoverRadius: 15,
      pointBackgroundColor: (context) => pickEnvironmentColor(context, 1),
      pointBorderColor: (context) => pickEnvironmentColor(context, 1),

      // pointBackgroundColor: 'red',

      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            // padding: 60,
            font: {
              size: 16,
            },
            z: 1,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
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
          caretSize: 12,
          boxPadding: 3,
          caretPadding: 15,
          bodyAlign: 'center',
          titleAlign: 'center',
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
          font: {
            weight: 'bold',
          },
          align: (ctx) => {
            const index = ctx.dataIndex;
            const temp = ctx.dataset.data;
            return temp[index] < 0 ? 'bottom' : 'top';
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
