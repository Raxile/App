const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error');
const getCordsForAddress = require('../util/location')
const Place = require('../models/place');

let DUMMY_PLACES =[
    {
      id:'p1',
      title:'Zsquare',
      description:'building',
      address:'Mall Rd, Downtown, Kanpur, Uttar Pradesh 208001',
      location:{
        lat:26.4732591,
        lng:80.3528144
      },
      creator:'u1'
  
    },
    
  ];

const getPlaceById = async (req,res,next)=>{
    const placeid = req.params.pid;
    let place;
    try {
       place = await Place.findById(placeid);
    } catch (err) {
      const error = new HttpError('Something went wrong , could not find a place',500);
      return next(error);
    }
    
     if(!place){
         const error= new HttpError('could not find a place for the provider user id',404);
         return next(error);
     }

         res.json({ place:place.toObject({ getters:true}) }); // => { place } => {place : place}
     
};



const  getPlacesByUserId = async (req,res,next)=>{
    const userid = req.params.uid;
    let places; 
    try {
      places = await Place.find({creator:userid});
    } catch (err) {
      const error =new HttpError('Something went wrong , could not find a place',500);
      return next(error);
    }
    
    if(!places || places.length === 0){
        return next(new HttpError('could not find a places for the creater id',404));
      }
    res.json({places:places.map((p)=>p.toObject({ getters:true })  ) });
};

const createPlace = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('invalid inputs passsed ,please check your data',422)); 
  }

  const {title,description,address,creator} = req.body;

  let coordinates;

  try {
     coordinates =  getCordsForAddress();
  } catch (error) {
     return next(error);
  }

   const createdPlace = new Place({
        title,
        description,
        address,
        location:coordinates,
        image:'https://yometro.com/images/places/z-square-mall.jpg',
        creator
   });

  //DUMMY_PLACES.push(createdPlace);  //unshift(createdPlace)
  try {
     await createdPlace.save();
   } catch (err) {
      const error = new HttpError('Creating place failed, please try again.',500);
      return next(error);
   }

  res.status(201).json({place:createdPlace.toObject({ getters:true})})
};

const updatePlace = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    throw new HttpError('invalid inputs passsed ,please check your data',422)
  }
  const {title,description} = req.body;
  const placeid = req.params.pid;

   let place;
  try {
    place = await Place.findById(placeid);
  } catch (err) {
    const error =new HttpError('Something went wrong ,could not update place',500);
    return next(error);
  }

  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (err) {
    const error = new HttpError('Something went wrong ,could not update place',500);
    return next(error);
  }
 

  res.status(200).json({place:place.toObject({ getters:true })})

};

const deletePlace = async (req,res,next)=>{
    const placeid = req.params.pid;
    
    let place;
    try {
      place = await Place.findById(placeid);
    } catch (err) {
      const error = new HttpError('something went wrong , could not delete place',500);
      return next(error);
    }
    try {
     await  place.remove();
    }
     catch (err) {
      const error = new HttpError('something went wrong , could not delete place',500);
      return next(error);
    }
    res.status(200).json({message:'delete place.'});

};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace =deletePlace;