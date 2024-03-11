import { getApiResponseWeather } from './response';

function getRequiredDayWeather(dayWeather) {
  return {
    minTemp: {
      minTemp_C: dayWeather.mintemp_c,
      minTemp_F: dayWeather.mintemp_f,
    },
    avgTemp: {
      avgTemp_C: dayWeather.avgtemp_c,
      avgTemp_F: dayWeather.avgtemp_f,
    },
    maxTemp: {
      maxTemp_C: dayWeather.maxtemp_c,
      maxTemp_F: dayWeather.maxtemp_f,
    },
    avgHumidity: dayWeather.avghumidity,
    condition: {
      text: dayWeather.condition.text,
      icon: dayWeather.condition.icon,
    },
    uvIndex: dayWeather.uv,
  };
}

function getRequiredHoursWeather(hoursWeather) {
  return hoursWeather.map((hour) => {
    return {
      temp: {
        temp_C: hour.temp_c,
        temp_F: hour.temp_f,
      },
      humidity: hour.humidity,
      cloud: hour.cloud,
    };
  });
}

export async function getRequiredWeather(location) {
  const weather = await getApiResponseWeather('forecast.json', location);

  const forecast = weather.forecast.forecastday[0];

  return {
    date: forecast.date,
    day: getRequiredDayWeather(forecast.day),
    hours: getRequiredHoursWeather(forecast.hour),
  };
}
