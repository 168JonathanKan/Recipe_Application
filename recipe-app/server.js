// require in dependencies
const cors = require('cors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const config = require('./config.json');

const search = require('./routes/search');
const history = require('./routes/history');

// call the express function which provides features and functionality for our server
const app = express();
const port = 8888;

//Sets up the ejs html viewer
app.set("view engine", 'ejs');

// apply middleware to application level
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static( "public" ) );
//Get index page
app.get('/', (req, res) =>{
   
    res.render('index');
})


//add routes
app.use('/search', search)

app.use('/history', history)



// mongodb+srv://dbAdmin:<password>@cluster0.asnx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}?retryWrites=true&w=majority`;
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
    if (err) {
        throw new Error('Failed to connect to MongoDb');
    }

    console.log('Connected successfully to Mongo');

    app.locals.db = client.db();

    // start the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
