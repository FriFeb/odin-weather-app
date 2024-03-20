import { getWeather } from '../backend/weather_cache';
import { showLocationInfo } from './main_section_elements/location/location_info';
import { showWeatherInfo } from './main_section_elements/weather_info';
import { showError, showLoading, showMain } from './sections';
import { showSearchFormDefaultHourInfo } from './main_section_elements/hour_info/hour_info';

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
    showSearchFormDefaultHourInfo(weather.hours);
  } catch (err) {
    console.log(err);
    showError(err.message);
  }
});
