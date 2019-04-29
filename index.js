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

//FIXME: Needs to display results in the DOM.
function displayResults(){

}

//FIXME: Needs to add source URL and images to recipeArray.
function updateRecipeArray(responseJsonYummlyTwo, recipeArray) {
    console.log(responseJsonYummlyTwo);

   //if responseJsonYummlyTwo id matches the id in recipeArray, 
    //then add new key value pairs for the image and source url of the recipe.
    for(let i=0; i<responseJsonYummlyTwo.length & i<recipeArray.length; i++) {
        if(responseJsonYummlyTwo[i].id === recipeArray[i].recipeID) {
            recipeArray.recipeImage = responseJsonYummlyTwo[i].images[0].hostedMediumUrl;
        }
        if(responseJsonYummlyTwo[0].id === recipeArray[0].recipeID) {
            recipeArray.recipeSourceUrl = responseJsonYummlyTwo[i].source.sourceRecipeUrl;
        }
    }

    console.log(recipeArray);
}

//Get Recipes GET request to the Yummly API.
function getRecipes(getURL, recipeArray) {
    
    //Run a fetch for each of the URLs in the array.
    for(let i=0; i<getURL.length; i++) {
        fetch(getURL[i])
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJsonYummlyTwo => updateRecipeArray(responseJsonYummlyTwo, recipeArray))
            .catch(err => {
                $('js-error-message').text(`Something went wrong: ${err.message}`);
            });
    }
}

//Create array of urls to feed into the get recipes endpoint of Yummly API.
function createRecipeUrls(recipeArray) {
    let getURL = [
        getRecipesURL + recipeArray[0].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[1].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[2].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[3].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[4].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[5].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[6].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[7].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[8].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
        getRecipesURL + recipeArray[9].recipeID + '?_app_id=' + foodAPIId + '&_app_key=' + foodAPIKey,
    ];

    console.log(getURL);
    getRecipes(getURL, recipeArray);
}

//Create array of objects containing recipe name and ID for each search result.
function createRecipeArray(responseJsonYummlyOne) {
    console.log(responseJsonYummlyOne);

    //Pulls what's needed from the search recipes endpoint JSON object.
    let recipeArray = [
        {
            recipeName: responseJsonYummlyOne.matches[0].recipeName,
            recipeID: responseJsonYummlyOne.matches[0].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[1].recipeName,
            recipeID: responseJsonYummlyOne.matches[1].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[2].recipeName,
            recipeID: responseJsonYummlyOne.matches[2].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[3].recipeName,
            recipeID: responseJsonYummlyOne.matches[3].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[4].recipeName,
            recipeID: responseJsonYummlyOne.matches[4].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[5].recipeName,
            recipeID: responseJsonYummlyOne.matches[5].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[6].recipeName,
            recipeID: responseJsonYummlyOne.matches[6].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[7].recipeName,
            recipeID: responseJsonYummlyOne.matches[7].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[8].recipeName,
            recipeID: responseJsonYummlyOne.matches[8].id
        },
        {
            recipeName: responseJsonYummlyOne.matches[9].recipeName,
            recipeID: responseJsonYummlyOne.matches[9].id
        },
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