function capitalizeCityName(cityName) {
  const words = cityName.split(' ');

  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );

  const capitalizedCityName = capitalizedWords.join(' ');

  return capitalizedCityName;
}

export function showCityName(cityName) {
  const text = document.querySelector('.city-name');

  text.innerHTML = capitalizeCityName(cityName);
}
