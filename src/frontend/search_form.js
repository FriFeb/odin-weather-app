import { getWeather } from '../backend/weather_cache';
import { getTempMode } from './main_section_elements/temp_mode';
import { hideMainSection, showMainSection } from './sections/main_section';
import {
  showCityName,
  showCountryName,
  showTime,
} from './main_section_elements/location_info';
import {
  showCloud,
  showCondition,
  showHumidity,
  showTemperature,
  showUv,
} from './main_section_elements/day_info';
import {
  hideErrorSection,
  showErrorMessage,
  showErrorSection,
} from './sections/error_section';
import {
  hideLoadingSection,
  showLoadingSection,
} from './sections/loading_section';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async (event) => {
  try {
    hideErrorSection();
    hideMainSection();
    showLoadingSection();

    event.preventDefault();

    const userInputCityName = searchForm.elements['location'].value;

    const weather = await getWeather(userInputCityName);

    const location = weather.location;
    const day = weather.day;
    const hours = weather.hours;

    hideLoadingSection();
    showMainSection();

    showCityName(location.cityName);
    showCountryName(location.country);
    showTime(location.time);

    showCondition(day.condition);
    showTemperature(day.temp, getTempMode());
    showHumidity(day.humidity);
    showCloud(day.cloud);
    showUv(day.uv);
  } catch (err) {
    console.log(err);
    hideLoadingSection();
    showErrorSection();
    showErrorMessage(err.message);
  }
});
