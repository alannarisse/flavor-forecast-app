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
const searchRecipesURL = 'https://api.yummly.com/v1/api/recipes';
const getRecipesURL = 'https://api.yummly.com/v1/api/recipe/';

//Converts the searchParams object into URL format. 
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Log JSON object for each recipe from the get endpoint in the console. 
function logRecipeURLs(responseJsonYummlyOne, responseJsonYummlyTwo) {
    console.log(responseJsonYummlyTwo);

    displayFoodResults(responseJsonYummlyOne, responseJsonYummlyTwo);
}


//Get Recipes GET request to the Yummly API.
function getRecipes(getURL, responseJsonYummlyOne) {
    
    //Run a fetch for each of the URLs in the array.
    for(let i=0; i<getURL.length; i++) {
        fetch(getURL[i])
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJsonYummlyTwo => logRecipeURLs(responseJsonYummlyOne, responseJsonYummlyTwo))
            .catch(err => {
                $('js-error-message').text(`Something went wrong: ${err.message}`);
            });
    }
}

//Create recipe URLs using the recipe IDs from the previous function. 
function createRecipeUrls(recipeId, responseJsonYummlyOne) {

    //Manually build the Get Recipes URL for each recipe ID in a new array.
    let getURL =
        [getRecipesURL + recipeId[0] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[1] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[2] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[3] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[4] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[5] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[6] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[7] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[8] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey, 
        getRecipesURL + recipeId[9] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey];

    //Log the array of URLs to the console.
    console.log(getURL);

    //Pass URLs, IDs, and the original JSON Object up to the getRecipes function.
    getRecipes(getURL, responseJsonYummlyOne);
}
 
//Logs recipe IDs to the console. 
function logRecipeID(responseJsonYummlyOne) {
    console.log(responseJsonYummlyOne);
    
    //Set up empty array to hold recipe IDs later.
    let recipeId =
        [responseJsonYummlyOne.matches[0].id, responseJsonYummlyOne.matches[1].id,
        responseJsonYummlyOne.matches[2].id, responseJsonYummlyOne.matches[3].id,
        responseJsonYummlyOne.matches[4].id, responseJsonYummlyOne.matches[5].id,
        responseJsonYummlyOne.matches[6].id, responseJsonYummlyOne.matches[7].id,
        responseJsonYummlyOne.matches[8].id, responseJsonYummlyOne.matches[9].id];
        
        console.log(recipeId);
    
    //Passes recipe IDs to the getRecipes function. 
    createRecipeUrls(recipeId, responseJsonYummlyOne);
}

//Search Recipes GET request to the Yummly API.
function searchRecipes(foodQuery) {

    //Sets up parameters for search endpoint. 
    const searchParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        q: foodQuery,
    };

    //Passes parameters through format function and creates a search URL.
    const searchRecipesQueryString = formatQueryParamsSearchRecipes(searchParams);
    const searchURL = searchRecipesURL + '?' + searchRecipesQueryString;
    console.log('Yummly search URL: ' + searchURL);

    //Makes GET reuqest with the URL as an argument.
    fetch (searchURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJsonYummlyOne => logRecipeID(responseJsonYummlyOne))
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

//Sends query to Yummly API based on logged weather.
function queryContents(triggerFoodQuery) {
    
    //Set up a variable for later.
    let foodQuery;
    
    //Assigns query string based on temperature logged in console.
    if(triggerFoodQuery >= 80) {
        foodQuery = 'summer';
    }
    else if(triggerFoodQuery >=50 & triggerFoodQuery <= 79) {
        foodQuery = 'spring';
    }
    else if(triggerFoodQuery >= 35 & triggerFoodQuery <= 49) {
        foodQuery = 'fall';
    }
    else {
        foodQuery ='winter';
    }
    console.log('Yummly will search: ' + foodQuery + ' recipes');

    //Passes query string to searchRecipes function.
    searchRecipes(foodQuery);
}

//Logs temp to the console.
function logWeatherResults(responseJsonWeather) {
    console.log(responseJsonWeather);

    let triggerFoodQuery = responseJsonWeather.main.temp;
    console.log('Current temp: ' + triggerFoodQuery);

    //Passes current temperature to the queryContents function.
    queryContents(triggerFoodQuery);
}

//GET request for Weather API.
function getWeather(query) {
    
    //Sets up parameters for Weather API.
    const weatherParams = {
        APPID: weatherAPIKey,
        zip: query,
        units: 'imperial',
    };

    //Passes parameters through format function and creates a search URL.
    const searchWeatherQueryString = formatQueryWeatherParams(weatherParams);
    const searchWeatherURL = weatherURL + '?' + searchWeatherQueryString;
    console.log('Search Weather URL: ' + searchWeatherURL);

    //Makes GET reuqest with the URL as an argument.
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

//Watch form submission for zip code.
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

//Triggers function when page loads.
$(watchForm);