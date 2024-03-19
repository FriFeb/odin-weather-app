import './style.css';
import './frontend/search_form_elements/input';
import './frontend/search_form';
import './frontend/main_section_elements/location/temp_mode_selection';
import './frontend/main_section_elements/hour_info/hour_info_mode';
/* 
TODO: 

  Backend:

    + chunk code into separate modules

    + handle 'no city found' error

    + grab day data from weather.current object

    + seize country and local time

    + request all required hour weather data

  Frontend:
  
    + brainstorm what I need to show 
      + day - condition, temp, humidity, cloud, uv
      + hours - condition, temp, humidity, cloud, uv
      
    + create a template to show the data
      + create a basic design in figma
      + write html
      + add styling

    + append the weather data to the template dynamically

    + append a city name dynamically

    + show the weather info after the form submit
    
    + show 'no city found' error

    + show a loading icon until a response is received 

    + show local time and city location

    + add the ability to switch between the temp modes

    + add clear button to the input field

    + add info to hours chart 
      + brainstorm how to show the data
      + show temp data
      + show humidity and cloud data

    + add the ability to toggle between hour charts

    + show hour weather info in main section based on hovered hour in chart 

    + show new local time in main section based on hovered hour in chart 

    Styling: 

      + location input 
      + clear button in the input field
      + search btn
      + explanations to the day info boxes
      + 'no city found' error
      + main content in center
      + error in center
      + loading icon animation
      + local time
      + city location
      + temp mode selection
      - use chart.js library to style hour chart
      + hour info mode selection
      - animations to the main section ...
      - change environment based on temperature ...
*/
