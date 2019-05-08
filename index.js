'use strict';

/////////////////////////// YUMMLY API ///////////////////////////

const foodAPIKey = 'aadffa2b9aa15de8d665d0e2fc535945';
const foodAPIId = '395836df';
const searchRecipesURL = 'https://api.yummly.com/v1/api/recipes';
const getRecipesURL = 'https://api.yummly.com/v1/api/recipe/';

function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

function watchrefreshButton() {
    $('#js-refresh-form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

function displayResults(recipeJsonResponse){  
    $('#js-recipe-results-list').empty();
    $('#js-error-message').empty();

    $('#js-recipe-results-list').append(
        `<section class="background-box"><a href="${recipeJsonResponse.attribution.url}" target="_blank"><img src="${recipeJsonResponse.images[0].hostedLargeUrl}"></a></section>
        <h3><a href="${recipeJsonResponse.attribution.url}" target="_blank">${recipeJsonResponse.name}</a></h3>`)   

    $('#results').removeClass('hidden');
    $('#js-subhead').addClass('hidden');
    console.log('You can now cook a suggested recipe!');

    watchRefreshButton();
}

function getRecipes(randomURL) {
    fetch(randomURL)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(recipeJsonResponse => displayResults(recipeJsonResponse))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function createRecipeUrls(recipeArray) {
    let getURL = [
        getRecipesURL + recipeArray[0] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[1] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[2] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[3] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[4] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[5] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[6] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[7] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[8] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[9] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
    ];

    console.log(getURL);
 
    let randomURL = getURL[Math.floor(Math.random()*getURL.length)];

    console.log(randomURL);
    getRecipes(randomURL);
}

function createRecipeArray(responseJsonYummlyOne) {
    console.log(responseJsonYummlyOne);

    let recipeArray = [
        responseJsonYummlyOne.matches[0].id, responseJsonYummlyOne.matches[1].id,
        responseJsonYummlyOne.matches[2].id, responseJsonYummlyOne.matches[3].id,
        responseJsonYummlyOne.matches[4].id, responseJsonYummlyOne.matches[5].id,
        responseJsonYummlyOne.matches[6].id, responseJsonYummlyOne.matches[7].id, 
        responseJsonYummlyOne.matches[8].id, responseJsonYummlyOne.matches[9].id
    ];

    console.log(recipeArray);
    createRecipeUrls(recipeArray);
}

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
        .then(responseJsonYummlyOne => createRecipeArray(responseJsonYummlyOne))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}



/////////////////////////// WEATHER API ///////////////////////////

const weatherAPIKey = '2f7a503fe0fd1f5d22571fdf7757e5f4';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

function formatQueryWeatherParams(weatherParams) {
    const queryItems = Object.keys(weatherParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(weatherParams[key])}`)
    return queryItems.join('&');
}

function queryContents(triggerFoodQuery) {
    let foodQuery;
    
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

    console.log('Yummly will search: ' + foodQuery);
    searchRecipes(foodQuery);
}

function logWeatherResults(responseJsonWeather) {
    console.log(responseJsonWeather);

    let triggerFoodQuery = responseJsonWeather.main.temp;
    console.log('Current temp: ' + triggerFoodQuery);
    queryContents(triggerFoodQuery);
}

function getWeather(query) {
    const weatherParams = {
        APPID: weatherAPIKey,
        zip: query,
        units: 'imperial',
    };

    const searchWeatherQueryString = formatQueryWeatherParams(weatherParams);
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

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

$(watchForm);