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
            - Refer to #9, as you might need to combine with this function.
            - Using the Search Recipes API call. 
    8.  Create a watchForm function and set up event listener that will trigger 
        the GET request to the MetaWeather API and the Yummly API upon submit.
    9.  Create a function that searches recipes based on the MetaWeather GET request results. 
        Then, call this function in #5.
            -   If 80 degrees and up, search summer recipes; else if 50-79 degrees, search 
                spring recipes; else if 35-50 degrees, search fall recipes; else, search 
                winter recipes.
    10. Call the watchWeatherForm function using jQuery so it runs as soon as the page loads. 

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
    -   What if we assign each season and weather ranges specific ingredients that are then 
        used as parameters in a Yummly search. Ie: if it's 80 or higher, or June, it'll trigger 
        a search for recipes that have tomatoes, or peaches, or strawberries, or salads in them. 

HELPFUL LINKS:
    -   Yummly API Documentation: https://developer.yummly.com/documentation
    -   MetaWeather API Documentation: https://www.metaweather.com/api/

*/


'use strict';

const foodAPIKey = 'TBD';
const searchURL = 'TBD';