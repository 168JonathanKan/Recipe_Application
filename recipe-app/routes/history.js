const router = require('express').Router();

router.get('/results', async(req, res) =>{
    try{
        const db = req.app.locals.db;
        const collection = db.collection('History');
        const all = await collection.find({}).toArray();
        res.status(200).json(all);
    }
    catch(error){
        res.status(500).json({error: error.toString()});
    }
})

module.exports = router;