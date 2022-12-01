const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes');
const userRoutes  = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const url = 'mongodb://localhost:27017/mern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//const url = 'mongodb+srv://<username>:<password>@clusterop.c1zvgx2.mongodb.net/places?authSource=admin&replicaSet=atlas-496jqv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); 
app.use('/api/users',userRoutes);    

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
    console.log(`mongo connected successfully`); 
}).catch(
    (err)=>{
        console.log(err);
    }
)

