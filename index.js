/*

GAME PLAN:
    1.  Guard against accidental global variables with Use Strict.
    2.  Set up foodAPIKey variable for Yummly API. 
    3.  Set up a searchURL variable for Yummly API.
    4.  Create a formatQueryParamsYummly function for Yummly API. 
    5.  Create displayFoodResults function for Yummly API.
    6.  Create GET request for MetaWeather API (no authentication needed)
            -   Do not actually need to display these results, we just need them to 
                trigger other actions. 
    7.  Create GET request for Yummly API.
    8.  Create a watchForm function and set up event listener that will trigger 
        the GET request to the MetaWeather API and the Yummly API upon submit.
    9.  Create a function that sorts/filters recipes based on the MetaWeather GET 
        request results. Then, call this function in #5.
            -   If 80 degrees and up, show A; else if 50-79 degrees, show B; else if 35-50 
                degrees, show C; else show D.
            -   If Jan-March, feature A ingredients; else if April-June show B ingredients;
                else if July-September show C ingredients; else show D ingredients.
    10. Call the watchWeatherForm function using jQuery so it runs as soon as 
        the page loads. 

QUESTIONS:
    1.  Everything we've learned so far hasn't loaded new pages when you click on things,
        but modifies what you see on the current page. Is that really what you want 
        when it comes to things like logging into accounts?
            -   Note: Having an account is only needed so you can save recipes, which
                is  a feature that will come later.
    2.  This is all well and good for showing search results, but what do you want to do 
        for viewing the actual recipe?
            -   Options: Link them to the site it's being pulled from, or loading the 
                content on your my site (will get out the door faster if you just 
                link to another site).

NOTES:
    -   Waiting for approval to use Yummly's API for academic purposes, otherwise the 
        cost is too high and you'll need to use the Spoonacular API.

*/


'use strict';

//GET request for the weather API
function getLocalWeather() {
    fetch(`https://www.metaweather.com/api/location/search/?query=${location}`)
        .then(response => response.json())
        .then(responseJuson => showResults(responseJson, location))
        .catch(error => alert("Something's gone wrong, please enter another location."));
}

