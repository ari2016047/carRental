const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const feedRoutes = require('./routes/cars');

const app = express();

app.use(bodyParser.json());

app.use(feedRoutes);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-yzdro.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`)
.then(result =>{
    console.log('Connection to mongodb successful');
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
})
