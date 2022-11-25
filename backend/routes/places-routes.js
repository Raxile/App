const express = require('express');

const router = express.Router();

const DUMMY_PLACES =[
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
    
  ]
 
router.get('/:pid',(req,res,next)=>{
    const placeid = req.params.pid;
    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeid;
     });
    
     if(!place){
        const error = new Error('could not find a place for the provider user id');
         error.code = 404;
         throw error;
     }

         res.json({place}); // => { place } => {place : place}
     
});

router.get('/user/:uid',(req,res,next)=>{
    const userid = req.params.uid;
    const place = DUMMY_PLACES.find(p=>{
        return p.creator === userid
    }); 
    
    if(!place){
        const error = new Error('could not find a place for the creater id');
         error.code = 404;
        return next(error);
      }
    res.json ({ place });
});

module.exports = router;