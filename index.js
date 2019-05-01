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

//FIXME: Uses recipeInfo array to display results in the DOM. 
function displayResults(recipeInfo){
    $('#js-recipe-results-list').empty();

    for(let i=0; i<recipeInfo.length; i++) {
        $('#js-recipe-results-list').append(
            `<li><img src="${recipeInfo[i].images[0].hostedLargeUrl}">
            <h3><a href="${recipeInfo[i].attribution.url}" target="_blank">${recipeInfo[i].name}</a></h3>
            </li>`
    )};

    $('#results').removeClass('hidden');
    console.log('You can now eat all the things.');
}

//Get Recipes GET request to the Yummly API.
function getRecipes(getURL) {
    
    //Will feed the JSON objects into this empty aray.
    const recipeInfo = [];

   //Run a fetch for each of the URLs in the array. 
    fetch(getURL[0])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseOne => recipeInfo.push(responseOne))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[1])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseTwo => recipeInfo.push(responseTwo))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
    
    fetch(getURL[2])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseThree => recipeInfo.push(responseThree))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
    
    fetch(getURL[3])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseFour => recipeInfo.push(responseFour))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
    
    fetch(getURL[4])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseFive => recipeInfo.push(responseFive))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[5])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseSix => recipeInfo.push(responseSix))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[6])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseSeven => recipeInfo.push(responseSeven))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[7])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseEight => recipeInfo.push(responseEight))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[8])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseNine => recipeInfo.push(responseNine))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    fetch(getURL[9])
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseTen => recipeInfo.push(responseTen))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });

    console.log(recipeInfo);
    displayResults(recipeInfo);
}

//Create array of urls to feed into the get recipes endpoint of Yummly API.
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
    getRecipes(getURL);
}

//Create array of objects containing recipe ID for each search result.
function createRecipeArray(responseJsonYummlyOne) {
    console.log(responseJsonYummlyOne);

    //Brings what's needed from the search recipes endpoint JSON object into one place.
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

//GET request to the search recipes endpoint of Yummly API.
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
    console.log(searchURL);

    //Makes GET reuqest with the URL as an argument.
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

    console.log('Yummly will search: ' + foodQuery);
    searchRecipes(foodQuery);
}

//Logs temp to the console.
function logWeatherResults(responseJsonWeather) {
    console.log(responseJsonWeather);

    let triggerFoodQuery = responseJsonWeather.main.temp;
    console.log('Current temp: ' + triggerFoodQuery);

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

    console.log(searchWeatherURL);

    //Makes GET request with the URL as an argument.
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