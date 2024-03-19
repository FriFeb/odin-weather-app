function capitalizeCityName(city) {
  const words = city.split(' ');

  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );

  const capitalizedCityName = capitalizedWords.join(' ');

  return capitalizedCityName;
}

function showCityName(city) {
  const text = document.querySelector('.city');

  text.innerHTML = capitalizeCityName(city);
}

function showCountryName(country) {
  const text = document.querySelector('.country');

  text.innerHTML = country;
}

function getSplittedTime(timeString) {
  const splittedTime = timeString.split(' ');

  return {
    localDate: splittedTime[0],
    localTime: splittedTime[1],
  };
}

function showLocalTime(localTime) {
  const text = document.querySelector('.local-time');

  text.innerHTML = localTime;
}

function showLocalDate(localDate) {
  const text = document.querySelector('.local-date');

  text.innerHTML = localDate;
}

export function showTime(timeString) {
  const time = getSplittedTime(timeString);

  showLocalTime(time.localTime);
  showLocalDate(time.localDate);
}

export function showLocationInfo(location) {
  showCityName(location.cityName);
  showCountryName(location.country);
  showTime(location.time);
}
