import { getWeather } from '../backend/weather_cache';
import { getTempMode } from '../backend/temp_mode';
import { showLocationInfo } from './main_section_elements/location/location_info';
import { showWeatherInfo } from './main_section_elements/weather_info';
import { showTempGraph } from './main_section_elements/hour_info/hour_info_chart';
import { showError, showLoading, showMain } from './sections';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async (event) => {
  try {
    showLoading();
    event.preventDefault();

    const userInputCityName = searchForm.elements['location'].value;

    const weather = await getWeather(userInputCityName);

    showMain();

    showLocationInfo(weather.location);
    showWeatherInfo(weather.day);
    showTempGraph(weather.hours, getTempMode());
  } catch (err) {
    console.log(err);
    showError(err.message);
  }
});
