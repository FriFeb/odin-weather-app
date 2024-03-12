import { getRequiredWeather } from '../backend/weather_handler';
import { hideMainSection, showMainSection } from './main_section';
import { showCityName } from './city_info';
import {
  showCondition,
  showHumidity,
  showTemperature,
  showUvIndex,
} from './day_info';
import {
  hideErrorSection,
  showErrorMessage,
  showErrorSection,
} from './error_section';
import { hideLoadingSection, showLoadingSection } from './loading_section';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async (event) => {
  try {
    hideErrorSection();
    hideMainSection();
    showLoadingSection();

    event.preventDefault();

    const cityName = searchForm.elements['location'].value;

    const weather = await getRequiredWeather(cityName);

    hideLoadingSection();
    showMainSection();
    showCityName(cityName);
    showCondition(weather.day.condition);
    showTemperature(weather.day.avgTemp);
    showHumidity(weather.day.avgHumidity);
    showUvIndex(weather.day.uvIndex);
  } catch (err) {
    console.log(err);
    hideLoadingSection();
    showErrorSection();
    showErrorMessage(err.message);
  }
});
