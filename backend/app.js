const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes');
const userRoutes  = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const url = 'mongodb://localhost:27017/mern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); //=> /api/places/...
app.use('/api/users',userRoutes);    //=> /api/users/...

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route',404);
    throw (error);
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occurred!'});
})

mongoose.connect(url).then(()=>{
    app.listen(5000);
}).catch(
    (err)=>{
        console.log(err);
    }
)

