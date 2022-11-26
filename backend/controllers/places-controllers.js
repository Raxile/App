const {v4:uuidv4} = require('uuid');

const HttpError = require('../models/http-error');

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

const getPlaceById = (req,res,next)=>{
    const placeid = req.params.pid;
    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeid;
     });
    
     if(!place){
         throw new HttpError('could not find a place for the provider user id',404);
     }

         res.json({place}); // => { place } => {place : place}
     
};

// function getPlaceById () {...}
//const getPlaceById = function() {...}

const  getPlacesByUserId = (req,res,next)=>{
    const userid = req.params.uid;
    const places = DUMMY_PLACES.filter(p=>{
        return p.creator === userid
    }); 
    
    if(!places || places.length === 0){
        return next(new HttpError('could not find a places for the creater id',404));
      }
    res.json ({ places });
};

const createPlace = (req,res,next)=>{
  const {title,description,coordinates,address,creator} = req.body;
  //const title = req.body.title;
  const createdPlace ={
    id:uuidv4(),
    title,
    description,
    location:coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace);  //unshift(createdPlace)
  
  res.status(201).json({place:createdPlace})
};

const updatePlace = (req,res,next)=>{
  const {title,description} = req.body;
  const placeid = req.params.pid;

  const updatePlace ={ ...DUMMY_PLACES.find(p=> p.id === placeid)};
  const placeIndex = DUMMY_PLACES.findIndex(p=> p.id === placeid)
  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({place:updatePlace})

};

const deletePlace = (req,res,next)=>{
    const placeid = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p=>p.id !== placeid );
    res.status(200).json({message:'delete place.'});

};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace =deletePlace;