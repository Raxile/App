const { validationResult } = require('express-validator');
const {v4:uuidv4} = require('uuid');

const HttpError = require('../models/http-error');

const  DUMMY_USERS = [
    {
    id:"u1",
    name:"Rocking Star Yash",
    email:"test@test.com",
    password:"testers",
  }
]; 

const getUsers = (req,res,next)=>{
    res.json({users: DUMMY_USERS});
}

const signup = (req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data ',422);
    }

    const {name,email,password} = req.body;

    const hasUser = DUMMY_USERS.find( u=> u.email === email);
    if(hasUser){
        throw new HttpError('could not create user, email already exist',422);
    }

    const createUser = {
        id:uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createUser);

    res.status(201).json({user:createUser})
};

const login = (req,res,next)=>{
    const {email,password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u=> u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError('could not identified user ,credentials seem to be wrong.',401)
    }

    res.json({message:'logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;