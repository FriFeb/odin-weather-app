export function showCondition(condition) {
  const image = document.querySelector('.condition-box .dynamic-box-image');
  const text = document.querySelector('.condition-box .dynamic-box-text');

  image.src = condition.icon;
  text.innerHTML = condition.text;
}

export function showTemperature(temperature, mode) {
  const text = document.querySelector('.temperature-box .dynamic-box-text');

  switch (mode) {
    case '0':
      text.innerHTML = `${temperature.temp_C} °C`;
      break;

    case '1':
      text.innerHTML = `${temperature.temp_F} °F`;
      break;
  }
}

export function showHumidity(humidity) {
  const text = document.querySelector('.humidity-box .dynamic-box-text');

  text.innerHTML = `${humidity} %`;
}

export function showCloud(cloud) {
  const text = document.querySelector('.cloud-box .dynamic-box-text');

  text.innerHTML = `${cloud} %`;
}

export function showUv(uv) {
  const text = document.querySelector('.uv-index-box .dynamic-box-text');

  text.innerHTML = uv;
}
