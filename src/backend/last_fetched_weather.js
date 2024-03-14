let lastFetchedWeather;

export function setLastFetchedWeather(weather) {
  lastFetchedWeather = weather;
}

export function getLastFetchedWeather() {
  return lastFetchedWeather;
}
