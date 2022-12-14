const {validationResult} = require('express-validator')
const  mongoose  = require('mongoose');

const HttpError = require('../models/http-error');
const getCordsForAddress = require('../util/location')
const Place = require('../models/place');
const User = require('../models/user');


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

         res.json({ place:place.toObject({ getters:true}) }); 
     
};



const  getPlacesByUserId = async (req,res,next)=>{
    const userid = req.params.uid;
   // let places;
    let usersWithPlaces; 
    try {
      usersWithPlaces = await User.findById(userid).populate('places');
    } catch (err) {
      const error =new HttpError('Something went wrong , could not find a place',500);
      return next(error);
    }
    
    //if(!places || .places.length === 0){
    if(!usersWithPlaces || usersWithPlaces.places.length === 0){
        return next(new HttpError('could not find a places for the creater id',404));
      }
    res.json({places:usersWithPlaces.places.map((p)=>p.toObject({ getters:true })  ) });
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

   let user;
   try {
        user = await User.findById(creator);
   } catch (err) {
    
    const error =new HttpError('Creating place failed,try again',500);
    return next(error);
   }

   if(!user){
    const error = new HttpError('Could not find user for provided id ',404);
    return next(error);
   }


  try {
    //const sess = await mongoose.startSession();
    //sess.startTransaction();
    //await createdPlace.save({ session:sess })
    await createdPlace.save()
    user.places.push(createdPlace);
    await user.save();
    //await user.save({ session: sess });
    //await sess.commitTransaction();

   } catch (err) {
    console.log(err);
      const error = new HttpError('Creating place failed, please try again.',500);
      return next(error);
   }

  res.status(201).json({place:createdPlace.toObject({ getters:true})})
};

const updatePlace = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return next(new HttpError('invalid inputs passsed ,please check your data',422));
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
      place = await Place.findById(placeid).populate('creator');
    } catch (err) {
      const error = new HttpError('something went wrong , could not delete place',500);
      return next(error);
    }

    if(!place){
      const error = new HttpError('Could not find place for this id ',404);
      return next(error);
    }

    try {
      //const sess = await mongoose.startSession();
      //sess.startTransaction();
      //await place.remove({ session:sess });
      await place.remove();
      place.creator.places.pull(place);
      await place.creator.save();
      //await place.creator.save({ session:sess });
      //await sess.commitTransaction();  
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
exports.deletePlace = deletePlace;