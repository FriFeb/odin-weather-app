import { getWeather } from '../backend/weather_cache';
import { getTempMode } from './temp_mode';
import { hideMainSection, showMainSection } from './main_section';
import { showCityName, showCountryName, showTime } from './location_info';
import {
  showCloud,
  showCondition,
  showHumidity,
  showTemperature,
  showUv,
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
