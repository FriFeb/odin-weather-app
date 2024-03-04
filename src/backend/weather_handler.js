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
  try {
    const weather = await getApiResponseWeather('forecast.json', location);

    return {
      date: weather.forecast.forecastday[0].date,
      day: getRequiredDayWeather(weather.forecast.forecastday[0].day),
      hours: getRequiredHoursWeather(weather.forecast.forecastday[0].hour),
    };
  } catch (err) {
    console.log(err);
  }
}
