/*

HELPFUL LINKS:
    -   Yummly API Documentation: https://developer.yummly.com/documentation
    -   Visual Inspo: https://www.loveandlemons.com/

*/


'use strict';

//Sets up the Yummly API key and base URL for use later.
const foodAPIKey = 'aadffa2b9aa15de8d665d0e2fc535945';
const foodAPIId = '395836df';
const searchRecipesURL = 'http://api.yummly.com/v1/api/recipes';

//Sets up the OpenWeatherMap API key and base URL for use later.
const weatherAPIKey = '{2f7a503fe0fd1f5d22571fdf7757e5f4}';
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather';

//Converts the searchParams object into URL format. 
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Converts the weatherParams object into URL format.
function formatQueryParamsSearchRecipes(weatherParams) {
    const queryItems = Object.keys(weatherParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(weatherParams[key])}`)
    return queryItems.join('&');
}

//Will display food search results in the DOM.
//Also hyperlinks to recipe page on source website in a new tab.
function displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo) {
    console.log(responseJsonYummlyOne, responseJsonYummlyTwo);
    $('#js-recipe-results-list').empty();
    for(let i=0; i<responseJsonYummlyOne.matches.length; i++) {
        $('#js-recipe-results-list').append(
            `<li><img src="${responseJsonYummlyOne.matches[i].smallImageUrls}" class="results-imgs">
            <h4><a href="${responseJsonYummlyTwo.attribution[i].url}" target="_blank">${responseJsonYummlyOne.matches[i].recipeName}</a></h4>`
        )};
    $('#results').removeClass('hidden');
}

//Get Recipes GET request to the Yummly API.
function getRecipes() {
    let recipeID = `${responseJsonYummlyOne.matches[i].id}`
    console.log();
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

//Sends query to Yummly API based on logged weather.
function watchWeatherLog() {
    const triggerFoodQuery = `${responseJsonWeather.main[i].temp}`;
    function {
        if(triggerFoodQuery >= 80) {
            let foodQuery = 'summer recipes';
        }
        else if(triggerFoodQuery >= 50, triggerFoodQuery <= 79 ) {
            let foodQuery = 'spring recipes';
        }
        else if(triggerFoodQuery >= 35, triggerFoodQuery <= 49 ) {
            let foodQuery = 'fall recipes';
        }
        else {
            let foodQuery = 'winter recipes';
        };
    };
    searchRecipes(foodQuery);
}

//Logs Weather Results to the console.
function logWeatherResults(responseJsonWeather) {
    console.log(responseJsonWeather);
}

//GET request to the Weather API.
function getWeather(queryWeather) {
    const weatherParams = {
        APPID: weatherAPIKey,
        q: {queryWeather},
        units: 'imperial',
    };
    const searchWeatherQueryString = formatQueryParamsSearchRecipes(weatherParams);
    const searchWeatherURL = weatherURL + '?' + searchWeatherQueryString;
    console.log(searchWeatherURL);
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

//Watches form submission to trigger initial GET request to weather API.
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

$(watchForm);