import { getRequiredWeather } from './backend/weather_handler';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const weather = await getRequiredWeather(form.elements['location'].value);

  console.log(weather);
});

/* 
TODO: 
  Backend:
    + chunk code into separate modules
    - handle 'no city found' errors

  Frontend:
    + brainstorm what I need to show 
      + day - condition, temp, humidity, uv
      + hours - temp, humidity, cloud (as 3 different tabs)
    - create a template to show the data
      - write html
      - add styling
    - append the weather data to the template dynamically

*/
