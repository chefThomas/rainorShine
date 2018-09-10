class WeatherService {
  // api.openweathermap.org/data/2.5/weather?zip=94040,us
  constructor() {
    this.key = 'bf2f4b3bd24bbcea5b7ff8d863b693d9';
  }

  async getWeather(zipcode) {

    const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=${this.key}`);

    let weatherData = await results.json();


    return {
      weather: weatherData
    };

  }
}