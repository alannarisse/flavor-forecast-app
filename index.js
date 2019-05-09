'use strict';

/////////////////////////// YUMMLY API ///////////////////////////

//Establish API Key, API ID, and base URL.
const foodAPIKey = 'aadffa2b9aa15de8d665d0e2fc535945';
const foodAPIId = '395836df';
const searchRecipesURL = 'https://api.yummly.com/v1/api/recipes';
const getRecipesURL = 'https://api.yummly.com/v1/api/recipe/';

//Format params for URLs.
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Watches for submit on different recipe button and reruns functions to display new result.
function watchrefreshButton() {
    $('#js-refresh-form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

//Displays the randomly chosen recipe in the DOM.
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

//GET request to Yummly get recipes endpoint using URL made from random match selection.
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

//Creates an array of URLs to feed to the Yummly API get recipes endpoint.
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
        getRecipesURL + recipeArray[10] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[11] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[12] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[13] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[14] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[15] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[16] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[17] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[18] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[19] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[20] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[21] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[22] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[23] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[24] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[25] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[26] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[27] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[28] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[29] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[30] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[31] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[32] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[33] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[34] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[35] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[36] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[37] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[38] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[39] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[40] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[41] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[42] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[43] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[44] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[45] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[46] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[47] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[48] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[49] + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
    ];

    console.log(getURL);
 
    let randomURL = getURL[Math.floor(Math.random()*getURL.length)];

    console.log(randomURL);
    getRecipes(randomURL);
}

//Creates an array out of the recipe IDs from matches in the JSON object.
function createRecipeArray(responseJsonYummlyOne) {
    console.log(responseJsonYummlyOne);

    let recipeArray = [
        responseJsonYummlyOne.matches[0].id, responseJsonYummlyOne.matches[1].id,
        responseJsonYummlyOne.matches[2].id, responseJsonYummlyOne.matches[3].id,
        responseJsonYummlyOne.matches[4].id, responseJsonYummlyOne.matches[5].id,
        responseJsonYummlyOne.matches[6].id, responseJsonYummlyOne.matches[7].id, 
        responseJsonYummlyOne.matches[8].id, responseJsonYummlyOne.matches[9].id,
        responseJsonYummlyOne.matches[10].id, responseJsonYummlyOne.matches[11].id,
        responseJsonYummlyOne.matches[12].id, responseJsonYummlyOne.matches[13].id,
        responseJsonYummlyOne.matches[14].id, responseJsonYummlyOne.matches[15].id,
        responseJsonYummlyOne.matches[16].id, responseJsonYummlyOne.matches[17].id, 
        responseJsonYummlyOne.matches[18].id, responseJsonYummlyOne.matches[19].id,
        responseJsonYummlyOne.matches[20].id, responseJsonYummlyOne.matches[21].id,
        responseJsonYummlyOne.matches[22].id, responseJsonYummlyOne.matches[23].id,
        responseJsonYummlyOne.matches[24].id, responseJsonYummlyOne.matches[25].id,
        responseJsonYummlyOne.matches[26].id, responseJsonYummlyOne.matches[27].id, 
        responseJsonYummlyOne.matches[28].id, responseJsonYummlyOne.matches[29].id,
        responseJsonYummlyOne.matches[30].id, responseJsonYummlyOne.matches[31].id,
        responseJsonYummlyOne.matches[32].id, responseJsonYummlyOne.matches[33].id,
        responseJsonYummlyOne.matches[34].id, responseJsonYummlyOne.matches[35].id,
        responseJsonYummlyOne.matches[36].id, responseJsonYummlyOne.matches[37].id, 
        responseJsonYummlyOne.matches[38].id, responseJsonYummlyOne.matches[39].id,
        responseJsonYummlyOne.matches[40].id, responseJsonYummlyOne.matches[41].id,
        responseJsonYummlyOne.matches[42].id, responseJsonYummlyOne.matches[43].id,
        responseJsonYummlyOne.matches[44].id, responseJsonYummlyOne.matches[45].id,
        responseJsonYummlyOne.matches[46].id, responseJsonYummlyOne.matches[47].id, 
        responseJsonYummlyOne.matches[48].id, responseJsonYummlyOne.matches[49].id
    ];

    console.log(recipeArray);
    createRecipeUrls(recipeArray);
}

//GET request to Yummly API search recipes endpoint.
function searchRecipes(foodQuery) {
    const searchParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        q: foodQuery,
        maxResult: 50,
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
            $('#js-error-message').text(`We're having a bit of trouble. Please try again.`);
        });
}



/////////////////////////// WEATHER API ///////////////////////////

//Establish API Key and base URL.
const weatherAPIKey = '2f7a503fe0fd1f5d22571fdf7757e5f4';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

//Format params for URLs.
function formatQueryWeatherParams(weatherParams) {
    const queryItems = Object.keys(weatherParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(weatherParams[key])}`)
    return queryItems.join('&');
}

//Determines query term for Yummly API based on current temp.
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


//Assign current temp from JSON object to variable. 
function logWeatherResults(responseJsonWeather) {
    console.log(responseJsonWeather);

    let triggerFoodQuery = responseJsonWeather.main.temp;
    console.log('Current temp: ' + triggerFoodQuery);
    queryContents(triggerFoodQuery);
}

//GET request to weather API.
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
            $('#js-error-message').text(`That zip code cannot be found.`);
        });
}

//Watches for submit on zip code form. 
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const queryWeather = $('#js-search-weather').val();
        getWeather(queryWeather);
    });
}

//Triggers initial function.
$(watchForm);