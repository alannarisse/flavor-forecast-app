/*

GAME PLAN:
    2.  Set up foodAPIKey variable for Yummly API. 
    3.  Set up base URL for MetaWeather API.
    6.  Create GET request for MetaWeather API (no authentication needed)
            -   Do not actually need to display these results, we just need them to 
                trigger other actions. 
    7.  Create two GET requests to Yummly API. 
            -   Refer to #9, as you might need to combine with this function.
            -   One for the Search Recipes API call. 
            -   One for the Get Recipes API call.
    8.  Create a watchForm function and set up event listener that will trigger 
        the GET request to the MetaWeather API and the Yummly API upon submit.
    9.  Create a function that searches recipes based on the MetaWeather GET request results. 
        Then, call this function in #5.
            -   If 80 degrees and up, search summer recipes; else if 50-79 degrees, search 
                spring recipes; else if 35-50 degrees, search fall recipes; else, search 
                winter recipes.
    10. Call the watchWeatherForm function using jQuery so it runs as soon as the page loads. 

NOTES:
    -   Waiting for approval to use Yummly's API for academic purposes, otherwise the 
        cost is too high and you'll need to use the Spoonacular API.
    -   The key to getting the two Yummly Endpoints to talk to each other is through the ID
        (found in the Search Recipes API).
    -   Need to find a new weather API
            >   The API must find weather based on entering either location of zip. NOT lat and long.

HELPFUL LINKS:
    -   Yummly API Documentation: https://developer.yummly.com/documentation
    -   Visual Inspo: https://www.loveandlemons.com/

*/


'use strict';

//Sets up the Yummly API key and base URLs for use later.
const foodAPIKey = 'TBD';
const foodAPIId = 'TBD';
const searchRecipesURL = 'http://api.yummly.com/v1/api/recipes';
const getRecipesURL = 'http://api.yummly.com/v1/api/recipe/recipe-id';

//Converts the searchParams object into URL format. 
function formatQueryParamsSearchRecipes(searchParams) {
    const queryItems = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    return queryItems.join('&');
}

//Converts the getParams object into URL format.
function formatQueryParamsGetRecipe(getParams) {
    const queryItems = Object.keys(getParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(getParams[key])}`)
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

//Search Recipes GET request to the Yummly API.
function searchRecipes(query) {
    const searchParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        q: query,
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

//Get Recipes GET request to the Yummly API.
function getRecipes() {
    const recipeId = ${responseJsonYummlyOne.matches[i].id};
    const getParams = {
        _app_id: foodAPIId,
        _app_key: foodAPIKey,
        recipe-id: recipeId,
    };
    const getRecipeQueryString = formatQueryParamsGetRecipe(getParams);
    const getURL = getRecipesURL + '?' + getRecipeQueryString;
    console.log(getURL);
    fetch (getURL)
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