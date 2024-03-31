import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getLastFetchedWeather } from '../../../backend/weather_cache';
import { getTempMode } from '../../../backend/temp_mode';
import { showTime } from '../location/location_info';
import { showWeatherInfo } from '../weather_info';

Chart.defaults.font.size = 20;
Chart.register(ChartDataLabels);
Chart.register({
  id: 'defaultWeatherInfo',
  beforeEvent(chart, args) {
    const { event } = args;
    if (event.type === 'mouseout') {
      showWeatherInfo(getLastFetchedWeather().day);
      showTime(getLastFetchedWeather().location.time);
    }
  },
});
Chart.defaults.set('plugins', {
  legend: {
    display: false,
  },

  datalabels: {
    font: {
      weight: 'bold',
    },
    align: 'end',
    anchor: 'end',
    offset: 4,
  },

  tooltip: {
    padding: 12,
    caretSize: 12,
    boxPadding: 3,
    caretPadding: 15,
    bodyAlign: 'center',
    titleAlign: 'center',
  },
});

function pickEnvironmentColor(environment, alpha) {
  const cold = `rgba(54, 162, 235, ${alpha})`;
  const warm = `rgba(255, 205, 86, ${alpha})`;

  switch (environment) {
    case 'cold':
      return cold;

    case 'warm':
    default:
      return warm;
  }
}

export function pickTempModeEnvironmentColor(ctx, alpha) {
  let y = ctx.p0?.parsed.y;
  if (!Number.isFinite(y)) y = ctx.parsed.y;

  switch (getTempMode()) {
    case '0':
      return y < 0
        ? pickEnvironmentColor('cold', alpha)
        : pickEnvironmentColor('warm', alpha);

    case '1':
    default:
      return y < 32
        ? pickEnvironmentColor('cold', alpha)
        : pickEnvironmentColor('warm', alpha);
  }
}

export const commonChartOptions = {
  aspectRatio: 4,
  responsive: true,
  maintainAspectRatio: false,
  borderColor: 'rgba(54, 162, 235, 1)',
  backgroundColor: 'rgba(54, 162, 235, 0.2)',

  layout: {
    padding: {
      top: 40,
    },
  },

  interaction: {
    intersect: false,
    mode: 'nearest',
    axis: 'x',
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
        padding: 10,
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
};
