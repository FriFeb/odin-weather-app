export function showCondition(condition) {
  const image = document.querySelector('.condition-box-image');
  const text = document.querySelector('.condition-box-text');

  image.src = condition.icon;
  text.innerHTML = condition.text;
}

export function showTemperature(temperature) {
  const text = document.querySelector('.temperature-box-text');

  text.innerHTML = `${temperature.avgTemp_C} °C`;
}

export function showHumidity(humidity) {
  const text = document.querySelector('.humidity-box-text');

  text.innerHTML = `${humidity} %`;
}

export function showUvIndex(uvIndex) {
  const text = document.querySelector('.uv-index-box-text');

  text.innerHTML = uvIndex;
}
