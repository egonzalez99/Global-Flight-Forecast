//this fie will be where the weather data is stored and called back to the front end (globe)

export function fetchData(callback) {
    const apiKey = '35e137dcc022e717eb9aaefadfae9332'; //openweathermap api key
    const url = `http://api.openweathermap.org/data/2.5/weather?id=5128581&units=metric&appid=${apiKey}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const temp = data.main.temp; // Temperature in Celsius
        callback(temp);  // Pass the temp to the callback (addMarker)
      })
      .catch(error => console.error('Error fetching weather data:', error));
}
