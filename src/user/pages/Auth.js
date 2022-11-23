import React,{ useState,useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElement/Card';
import {
    VALIDATOR_EMAIL, 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE
 } from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode,setIsLoginMode]= useState(true);
    const [formState, inputHandler,setFormData] =useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false);

    const switchModeHandler = ()=>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
                
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
           setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            }
           },false)
        }

        setIsLoginMode(prevMode =>!prevMode)
    }

    const authSubmitHandler = event=>{
      event.preventDefault();
      console.log(formState.inputs);
      auth.login();
    }

    return (

      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
         <form  onSubmit={authSubmitHandler}>
            {!isLoginMode &&( 
            <Input
             element='input'
             id="name"
             type="text"
             label="Your Name"
             validators={[VALIDATOR_REQUIRE()]}
             errorText="Please enter a name"
             onInput={inputHandler}  
            />
            )}
            <Input 
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]} 
            errorText="Please enter a valid E-mail address"
            onInput={inputHandler}
            />
            <Input 
            element="input"
            id="password"
            type="password"
            label="PASSWORD"
            validators={[VALIDATOR_MINLENGTH(4)]} 
            errorText="Please enter a valid password (at least 4 character)"
            onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ?'LOGIN':'SIGNUP'}</Button>
         </form>
         <Button inverse onClick={switchModeHandler}>Switch TO {!isLoginMode ?'LOGIN':'SIGNUP'}</Button>
      </Card>
  )
}

export default Auth
