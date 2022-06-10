//Where our api request calls are made
const superagent = require("superagent");

//Our config file with base url and api_key for access
const config = require("./config.json")

//Gets a random recipe from Spoonacular database
const getRandomRecipe = async (count) =>{
    try{
        const recipeUrl = `${config.url}recipes/random?number=${count}&${config.api_key}`;
        const response = await superagent.get(recipeUrl);
        return response.body;
    }
    catch(error){
        return error;
    }
}

//Gets a random recipe 
const autoSearchRecipe = async (name) =>{
    try{
        const recipeUrl = `${config.url}recipes/autocomplete?number=25&query=${name}&${config.api_key}`;
        const response = await superagent.get(recipeUrl);
        return response.body;
    }
    catch(error){
        return error;
    }
}

//Search by ID
const searchID = async(id) =>{
    try{
        const recipeUrl = `${config.url}recipes/${id}/information?${config.api_key}`;
        const response = await superagent.get(recipeUrl);
        return response.body;
    }
    catch(error){
        return error;
    }
}

//Search by ID
const searchIDSummary = async(id) =>{
    try{
        const recipeUrl = `${config.url}recipes/${id}/summary?${config.api_key}`;
        const response = await superagent.get(recipeUrl);
        return response.body;
    }
    catch(error){
        return error;
    }
}

module.exports = {
    getRandomRecipe,
    autoSearchRecipe,
    searchID,
    searchIDSummary
}