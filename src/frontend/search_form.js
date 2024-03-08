import { getRequiredWeather } from '../backend/weather_handler';
import {
  showCondition,
  showHumidity,
  showTemperature,
  showUvIndex,
} from './day_info';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const weather = await getRequiredWeather(
    searchForm.elements['location'].value
  );

  console.log(weather);

  showCondition(weather.day.condition);
  showTemperature(weather.day.avgTemp);
  showHumidity(weather.day.avgHumidity);
  showUvIndex(weather.day.uvIndex);
});
