import { getRequiredWeather } from '../backend/weather_handler';
import { showMainSection } from './main';
import { showCityName } from './city_info';
import {
  showCondition,
  showHumidity,
  showTemperature,
  showUvIndex,
} from './day_info';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const cityName = searchForm.elements['location'].value;

    const weather = await getRequiredWeather(cityName);

    showMainSection();
    showCityName(cityName);
    showCondition(weather.day.condition);
    showTemperature(weather.day.avgTemp);
    showHumidity(weather.day.avgHumidity);
    showUvIndex(weather.day.uvIndex);
  } catch (err) {
    console.log(err.message);
  }
});
