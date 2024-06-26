import { getTempMode } from '../../backend/temp_mode';

function showCondition(condition) {
  const image = document.querySelector('.condition-box .dynamic-box-image');
  const text = document.querySelector('.condition-box .dynamic-box-text');

  image.src = condition.icon;
  text.innerHTML = condition.text;
}

export function showTemperature(temperature, tempMode) {
  const text = document.querySelector('.temperature-box .dynamic-box-text');

  switch (tempMode) {
    case '0':
      text.innerHTML = `${temperature.temp_C} °C`;
      break;

    case '1':
    default:
      text.innerHTML = `${temperature.temp_F} °F`;
      break;
  }
}

function showHumidity(humidity) {
  const text = document.querySelector('.humidity-box .dynamic-box-text');

  text.innerHTML = `${humidity} %`;
}

function showCloud(cloud) {
  const text = document.querySelector('.cloud-box .dynamic-box-text');

  text.innerHTML = `${cloud} %`;
}

function showUv(uv) {
  const text = document.querySelector('.uv-index-box .dynamic-box-text');

  text.innerHTML = uv;
}

export function showWeatherInfo(weatherObj) {
  showCondition(weatherObj.condition);
  showTemperature(weatherObj.temp, getTempMode());
  showHumidity(weatherObj.humidity);
  showCloud(weatherObj.cloud);
  showUv(weatherObj.uv);
}
