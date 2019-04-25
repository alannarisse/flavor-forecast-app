/*

HELPFUL LINKS:
    -   Yummly API Documentation: https://developer.yummly.com/documentation
    -   Open Weather Map API Documentation: https://openweathermap.org/current
    -   Visual Inspo: https://www.loveandlemons.com/

*/

'use strict';

/////////////////////////// YUMMLY API CODE  ///////////////////////////

//Sets up the Yummly API key and base URL for use later.
const foodAPIKey = 'aadffa2b9aa15de8d665d0e2fc535945';
const foodAPIId = '395836df';
const searchRecipesURL = 'http://api.yummly.com/v1/api/recipes';

//Converts the searchParams object into URL format. 
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Will display food search results in the DOM.
//Also hyperlinks to recipe page on source website in a new tab.
function displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo) {
    console.log(responseJsonYummlyOne, responseJsonYummlyTwo);
    $('#js-recipe-results-list').empty();
    for(let i=0; i<responseJsonYummlyOne.matches.length; i++) {
        $('#js-recipe-results-list').append(
            `<li><img src="${responseJsonYummlyOne.matches.smallImageUrls}" class="results-imgs">
            <h4><a href="${responseJsonYummlyTwo.attribution.url}" target="_blank">${responseJsonYummlyOne.matches.recipeName}</a></h4>`
        )};
    $('#js-recpie-results-list').removeClass('hidden');
}

//Get Recipes GET request to the Yummly API.
function getRecipes() {
    let recipeID = `${responseJsonYummlyOne.matches.id}`;
    fetch (`http://api.yummly.com/v1/api/recipe/recipe-id?${recipeID}_app_id=${foodAPIId}&_app_key=${foodAPIKey}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonYummlyTwo => displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

//Search Recipes GET request to the Yummly API.
function searchRecipes(foodQuery) {
    const searchParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        q: foodQuery,
    };
    const searchRecipesQueryString = formatQueryParamsSearchRecipes(searchParams);
    const searchURL = searchRecipesURL + '?' + searchRecipesQueryString;
    console.log(searchURL);
    fetch (searchURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonYummlyOne => displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

/////////////////////////// WEATHER API CODE  ///////////////////////////

//Sets up the OpenWeatherMap API key and base URL for use later.
const weatherAPIKey = '2f7a503fe0fd1f5d22571fdf7757e5f4';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

//Converts the weatherParams object into URL format.
function formatQueryWeatherParams(weatherParams) {
    const queryItems = Object.keys(weatherParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(weatherParams[key])}`)
    return queryItems.join('&');
}

//Sends query to Yummly API based on logged weather
function queryContents(triggerFoodQuery) {
    
    //Set up a variable for later
    let foodQuery;
    
    //Assigns query string based on temperature logged in console
    if(triggerFoodQuery >= 80) {
        foodQuery = 'summer recipes';
    }
    else if(triggerFoodQuery >=50 & triggerFoodQuery <= 79) {
        foodQuery = 'spring recipes';
    }
    else if(triggerFoodQuery >= 35 & triggerFoodQuery <= 49) {
        foodQuery = 'fall recipes';
    }
    else {
        foodQuery ='winter recipes';
    }
    console.log('Yummly will search for ' + foodQuery);

    //Passes query term to searchRecipes function
    searchRecipes(foodQuery);
}

//Logs temp to the console and passes it to the queryContents API
function logWeatherResults(responseJsonWeather) {
    let triggerFoodQuery = responseJsonWeather.main.temp;
    queryContents(triggerFoodQuery);

    console.log(triggerFoodQuery);
}

//GET request for Weather API
function getWeather(query) {
    
    //Set up parameters for Weather API
    const weatherParams = {
        APPID: weatherAPIKey,
        zip: query,
        units: 'imperial',
    };

    //Passes parameters through format function and creates a search URL
    const searchWeatherQueryString = formatQueryWeatherParams(weatherParams);
    const searchWeatherURL = weatherURL + '?' + searchWeatherQueryString;
    console.log(searchWeatherURL);

    //Makes GET reuqest with the URL as an argument
    fetch (searchWeatherURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonWeather => logWeatherResults(responseJsonWeather))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

//Watch form submission for zip code 
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

//Triggers function when page loads
$(watchForm);