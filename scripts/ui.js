class ui {

  constructor(){
    this.location = document.getElementById('w-location')
    this.weatherDescription = document.getElementById('w-description');
    this.temp = document.getElementById('w-temperature');
    this.weatherIcon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
  }


  // invalid zip
  displayError(element, message) {

    element.value = message;
    element.className = "form-control-sm error";
    console.log(element.clasName);
    console.log(message);

    setTimeout(function() {
      element.value = "";
      element.className = "form-control-sm";

    }, 1500);
  }

  displayResults(r) {
    console.log(r);

    this.location.innerText = r.name;
    this.weatherDescription.innerText = r.weather[0].description;

    // convert temp to F from K
    this.temp.innerText = Math.round(r.main.temp * 9/5 - 459.67).toFixed(0) + '°F';
    this.weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${r.weather[0].icon}.png`);
    this.humidity.innerText = `Humidity ${r.main.humidity} %`;

    // Avoid NaN if no wind/wind direction
    if(!r.wind.speed || !r.wind.deg) {
      this.wind.innerText = '-';
    } 
    
    else {

     function cardinalWindDirection(windDeg) {

        let windCardinal;
  
        if(windDeg >= 338 & windDeg < 23) {
          windCardinal = "N";
        }
  
        if(windDeg >= 23 & windDeg < 68) {
          windCardinal = "NE";
        }
  
        if(windDeg >= 68 & windDeg < 113) {
          windCardinal = "E";
        }
  
        if(windDeg >= 113 & windDeg < 158) {
          windCardinal = "SE";
        }
  
        if(windDeg >= 158 & windDeg < 203) {
          windCardinal = "S";
        }
  
        if(windDeg >= 203 & windDeg < 248) {
          windCardinal = "SW";
        }
  
        if(windDeg >= 248 & windDeg < 293) {
          windCardinal = "W";
        }
        
        if(windDeg >= 293 & windDeg < 338) {
          windCardinal = "SW";  
        }

        return windCardinal;
  
        }

      this.wind.innerText = `Speed, ${((r.wind.speed/1600)* (1/1.6)).toFixed(1)} mph, Direction, ${cardinalWindDirection(r.wind.deg)} ( ${r.wind.deg.toFixed(0)} )`; // convert meters/s to mph

      
      }

    }
  }
