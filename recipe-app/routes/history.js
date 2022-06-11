const router = require('express').Router();

router.get('/results', async(req, res) =>{
    try{
        const db = req.app.locals.db;
        const collection = db.collection('History');
        const history_logs = await collection.find({}).toArray();
        console.log(history_logs);
        res.status(200).render("history_page", { history_logs });
    }
    catch(error){
        res.status(500).json({error: error.toString()});
    }
})

module.exports = router;