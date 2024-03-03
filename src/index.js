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
