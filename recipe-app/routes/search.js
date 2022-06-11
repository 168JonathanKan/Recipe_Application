//Uses our custom made module which makes api requests to Spoonacular
const recipe =  require('recipe-api');

const router = require('express').Router();




//apply router level middleware(adds date)
router.use((req, res, next) => {
    console.log('Running Router Level Middleware');

    if (req.method === 'POST' && req.body) {
        const { body } = req;
        body.created = new Date();
    }

    // this middleware is done processing and move on to the next thing in line
    next();
});

//GET router for search function
router.get('/recipe', async(req, res) =>{
    try{
        const { query } = req.query;
        //api call to search for recipe
        //Stores the found foods into an array of objects with the name and id
        const foundRecipe = await recipe.autoSearchRecipe(query);
        console.log(foundRecipe);
        //holds all the search results
        const results = {
            resultCount: foundRecipe.length, 
            results: foundRecipe
        };
        //Adds what we searched
        results.searched = query;
        res.status(200).render("results", { results });
    }
    catch(error){
        res.status(500).json({error: error.toString()});
    }
})

//GET router for search function
router.post('/recipe/details', async(req, res) =>{
    try{
        console.log("posting");
        const { body } = req;
        
        //api call to search for recipe by id
        const getRecipeDetails = await recipe.searchID(body.selectedKey);
        //add to history database
        const db = req.app.locals.db;
        const collection = db.collection('History');
        const historyDetails = {
            keyword: body.keyword, 
            count: body.count, 
            selectedKey: body.selectedKey, 
            selectedText: body.selectedText, 
            timestamp: body.created
        }
        console.log(historyDetails);
        await collection.insertOne(historyDetails);
        //only shows details
        console.log(getRecipeDetails);
        res.status(201).render("details", { getRecipeDetails });
    }
    catch(error){
        res.status(500).json({error: error.toString()});
    }
})


module.exports = router;