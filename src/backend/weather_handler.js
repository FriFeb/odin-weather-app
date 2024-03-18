import { getApiResponseWeather } from './response';

function getRequiredLocation(location) {
  return {
    cityName: location.name,
    country: location.country,
    time: location.localtime,
  };
}

function getRequiredDayWeather(dayWeather) {
  return {
    condition: {
      text: dayWeather.condition.text,
      icon: dayWeather.condition.icon,
    },
    temp: {
      temp_C: dayWeather.temp_c,
      temp_F: dayWeather.temp_f,
    },
    humidity: dayWeather.humidity,
    cloud: dayWeather.cloud,
    uv: dayWeather.uv,
  };
}

function getRequiredHoursWeather(hoursWeather) {
  return hoursWeather.map((hour) => {
    return {
      condition: {
        text: hour.condition.text,
        icon: hour.condition.icon,
      },
      temp: {
        temp_C: hour.temp_c,
        temp_F: hour.temp_f,
      },
      humidity: hour.humidity,
      cloud: hour.cloud,
      uv: hour.uv,
    };
  });
}

export async function getRequiredWeather(location) {
  const weather = await getApiResponseWeather('forecast.json', location);

  const forecast = weather.forecast.forecastday[0];

  return {
    location: getRequiredLocation(weather.location),
    day: getRequiredDayWeather(weather.current),
    hours: getRequiredHoursWeather(forecast.hour),
  };
}
