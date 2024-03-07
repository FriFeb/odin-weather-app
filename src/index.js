import { getRequiredWeather } from './backend/weather_handler';
import './style.css';

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

    + create a template to show the data
      + create a basic design in figma
      + write html
      + add styling

    - append the weather data to the template dynamically

    - add ability to switch between temp modes

    - add info to hours graph 
      - brainstorm how to show the data
      - ...

    - add ability to toggle between hour graphs

    - add advanced styling
      - location input 
      - temp mode selection
      - explanations to the day info boxes
      - hour info mode selected 
      - hour graph
*/
