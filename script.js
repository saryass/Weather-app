const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "09a8007dfa596f8659e487c5307881a5";


weatherForm.addEventListener('submit', event => {
    event.preventDefault();   //when the  form is submitted by clicking the button whose type is submit.we wanna prevent the page from refreshing.

    const city = cityInput.value.trim();

    if (city === '') { //if input field is empity:

        errorDisplay('Please enter a city name');  //call 
    }
    else { //when the input field is NOT empity:
        getWeatherData(city);
    }
})
// ********************************************************************************
//   errorDisplay(msg) function  for showing a message when input field is empty:
// ********************************************************************************
function errorDisplay(msg) {
    const errorMSG = document.createElement('p');
    // errorMSG.textContent = 'Please enter a city name';   //this way is also true if we don't use (msg) parameter for errorDisplay function ;)
    errorMSG.textContent = msg;
    errorMSG.classList.add('errorStyle');

    card.textContent = ''; //important to prevent keep repeating showing errorMSG after more than 1 click ;)
    card.style.display = 'flex';
    card.appendChild(errorMSG);
}
// ********************************************************************************
//   making a function for fetching data from API
// ********************************************************************************
async function getWeatherData(city) {

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    //once we have a response we have to check the response as below:
    try {  
        if (!response.ok) { //if the response is NOT ok, which means the given input value is not available inside API DATA.(Ok:false) & (Status:400-499).
            errorDisplay(`Please enter a valid city name. ${city} is not valid.`); //This Must be above Throw new Error, otherwise it wont work ;)
            throw new Error(`Could not ftch ${city} in API data`);
        }
        const data = await response.json(); //if the response is ok, which means the given input value is available inside API DATA.(Ok:ture) & (Status:200-299). we convert it into JSON file and do whatever u wanna do to that data ;)  
        console.log(data);
        //_______________________________
        newElements(data); //since we passed 'data' variable, so we have to call this function inside  getWeatherData function since variable "data" has a local scope which is getWeatherData.
    }
    catch (error) {
        console.error(error);
    }
}
// **********************************************************************************************************************************
//   making a function for creating new elements we wanna show up when response is ok/ means given input is available inside API DATA
// ***********************************************************************************************************************************
function newElements(data) {

    const cityName = document.createElement('h1');

    cityName.textContent = data.name; //fetched from API data
    cityName.classList.add('cityNameStyle')

    card.textContent = '';  //the order MUST be like this to work as expected.
    card.appendChild(cityName)
    card.style.display = 'flex';
    //______________________________________________
    const temperature = document.createElement('h1');

    const kelvinToCelsius = ((data.main.temp) - 273.15).toFixed(1) + "°C"
    temperature.textContent = kelvinToCelsius;  //fetched from API data
    cityName.classList.add('temperatureStyle')

    // card.textContent = ''; //no need this line anymore.
    card.appendChild(temperature)
    card.style.display = 'flex';
    //________________________________________________
    const humidity = document.createElement('p');
    humidity.textContent = 'humidity: ' + data.main.humidity + '%'; //fetched from API
    humidity.classList.add('humidityStyle');

    // card.textContent = ''; //no need this line anymore.
    card.appendChild(humidity)
    card.style.display = 'flex';
    //________________________________________________
    const description = document.createElement('p');
    description.textContent = data.weather[0].description;
    description.classList.add('descriptionStyle');

    // card.textContent = ''; //no need this line anymore.
    card.appendChild(description);
    card.style.display = 'flex';
    //________________________________________________

    weatherEmoji(data); // //since we passed 'data' variable, so we have to call this function inside  getWeatherData function since variable "data" has a local scope which is getWeatherData. and newElements function is already being called inside getWeatherData function.
}
// **********************************************************************************************************************************
//   making a function for creating new elements we wanna show up when response is ok/ means given input is available inside API DATA
// ***********************************************************************************************************************************
function weatherEmoji(data) {
    const weatherID = data.weather[0].id;
    const emojiElement = document.createElement('p');
    emojiElement.classList.add('weatherEmojiStyle');

    switch (true) {                         //switch (true): This initiates a switch statement where the expression being evaluated against different values is (true). This essentially allows us to use boolean expressions in the case statements.
        case weatherID === 800:                   //If the condition weatherID === 800 is true, it executes the code within this case block. In this case, it sets the textContent of emojiElement to ☀️.
            emojiElement.textContent = '☀️';
            // card.appendChild(emojiElement);
            break;

        case weatherID >= 801:   //If the condition weatherID >= 801 is true, it executes the code within this case block. In this case, it sets the textContent of emojiElement to ☁️.
            emojiElement.textContent = '☁️';
            // card.appendChild(emojiElement);
            break;

        case weatherID >= 600 && weatherID <= 699:  //If the condition weatherID is between 600 and 699 (inclusive), it executes the code within this case block. In this case, it sets the textContent of emojiElement to ❄️.
            emojiElement.textContent = '❄️';
            // card.appendChild(emojiElement);
            break;

        case weatherID >= 500 && weatherID <= 599:  //If the condition weatherID is between 500 and 599 (inclusive), it executes the code within this case block. In this case, it sets the textContent of emojiElement to ☔.
            emojiElement.textContent = '☔';
            // card.appendChild(emojiElement);
            break;

        case weatherID >= 200 && weatherID <= 499:  // If the condition weatherID is between 200 and 499 (inclusive), it executes the code within this case block. In this case, it sets the textContent of emojiElement to ⛈️.
            emojiElement.textContent = '⛈️';
            // card.appendChild(emojiElement);
            break;

        default:  // If none of the above cases match, it executes the code within this default case block. In this case, it sets the textContent of emojiElement to 🌈, indicating unknown weather.
            emojiElement.textContent = '🌈'; //Default emoji for unkown weather.
    }

    card.appendChild(emojiElement);
}



//Below is the (else if) vertion of the above function:
 
// function weatherEmoji(data) {
//     const weatherID = data.weather[0].id;
//     if (weatherID === 800) {

//         const sun = document.createElement('p');
//         sun.textContent = '☀️';
//         sun.classList.add('weatherEmoji')

//         card.appendChild(sun)
//         // card.style.display="flex";
//     }
//     else if (weatherID >= 801) {
//         const cloud = document.createElement('p');
//         cloud.textContent = '☁️';
//         cloud.classList.add('weatherEmoji')

//         card.appendChild(cloud)
//     }
//     else if (weatherID >= 600 && weatherID <= 699) {
//         const snow = document.createElement('p');
//         snow.textContent = '❄️';
//         snow.classList.add('weatherEmoji')

//         card.appendChild(snow)
//     }
//     else if (weatherID >= 500 && weatherID <= 599) {
//         const rain = document.createElement('p');
//         rain.textContent = '☔';
//         rain.classList.add('weatherEmoji')

//         card.appendChild(rain)

//     }
//     else if (weatherID >= 200 && weatherID <= 499) {
//         const thunder = document.createElement('p');
//         thunder.textContent = '⛈️';
//         thunder.classList.add('weatherEmoji');

//         card.appendChild(thunder);
//     }
// }
