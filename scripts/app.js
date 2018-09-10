// instantiate API and ui classes
const api = new WeatherService();
const display = new ui();

// default to Seattle weather when app first loads
window.onload = () => {
  api.getWeather(98122)
  .then(data => {
    if(data.weather.cod == "404"){ 
      display.displayError(zipUserInput, "That zip does not exist")
      return;
    }

    if(data.weather.cod != 200) {display.displayError(zipUserInput, "Something went wrong")
      return;
    }

    if(data.weather.cod == 200) {
      display.displayResults(data.weather);
    }
  })
  .catch(function(err) {
    display.displayError(zipUserInput, err);
  });
};

// listen for submit button click
const submitButton = document.getElementById('submit-button').addEventListener('click', apiRequest);

// listen for enter key
const enterKey = document.getElementById('zip').addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    apiRequest();
    event.preventDefault();
  }
});

// callback for submit button click
function apiRequest(){

  // get zip from text field
  const zipUserInput = document.getElementById('zip');


  // // test
  // console.log(zipString);
  // // check

  // validate zipsString. Matches 5 digits bookended with zero or more spaces
  const pattern = /\s*\d{5}\s*/; 


  // display error if zip is not 5 digits
  if(!pattern.test(zipUserInput.value)) {
    display.displayError(zipUserInput, 'Must be 5 digit zip');
  }

  //
  if(pattern.test(zipUserInput.value)) {

    api.getWeather(zipUserInput.value)
    .then(data => {
      if(data.weather.cod == "404"){ 
        display.displayError(zipUserInput, "That zip does not exist")
        return;
      }

      if(data.weather.cod != 200) {display.displayError(zipUserInput, "Something went wrong")
        return;
      }

      if(data.weather.cod == 200) {
        display.displayResults(data.weather);
      }
    })
    .catch(function(err) {
      display.displayError(zipUserInput, err);
    });
  }
}
