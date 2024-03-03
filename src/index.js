async function getApiResponseData(endpoint, location) {
  try {
    const API_KEY = '2d6c75310ccb4beb92582620240203';

    const response = await fetch(
      `https://api.weatherapi.com/v1/${endpoint}?q=${location}&key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getRequiredDayData(dayData) {
  return {
    minTemp: {
      minTemp_C: dayData.mintemp_c,
      minTemp_F: dayData.mintemp_f,
    },
    avgTemp: {
      avgTemp_C: dayData.avgtemp_c,
      avgTemp_F: dayData.avgtemp_f,
    },
    maxTemp: {
      maxTemp_C: dayData.maxtemp_c,
      maxTemp_F: dayData.maxtemp_f,
    },
    avgHumidity: dayData.avghumidity,
    condition: {
      text: dayData.condition.text,
      icon: dayData.condition.icon,
    },
    uvIndex: dayData.uv,
  };
}

function getRequiredHoursData(hoursData) {
  return hoursData.map((hour) => {
    return {
      temp: {
        temp_C: hour.temp_c,
        temp_F: hour.temp_f,
      },
      humidity: hour.humidity,
      cloud: hour.cloud,
    };
  });
}

async function getRequiredData(location) {
  try {
    const data = await getApiResponseData('forecast.json', location);

    return {
      date: data.forecast.forecastday[0].date,
      day: getRequiredDayData(data.forecast.forecastday[0].day),
      hours: getRequiredHoursData(data.forecast.forecastday[0].hour),
    };
  } catch (err) {
    console.log(err);
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getRequiredData(form.elements['location'].value).then((data) => {
    console.log(data);
  });
});

/* 
TODO: 
  Backend:
    - chunk code into modules
    - handle 'no city found' errors
    - refactor code

  Frontend:
    - show required data on the page
      - brainstorm what I need to show
      - create elements to store the data
      - add styling

*/
