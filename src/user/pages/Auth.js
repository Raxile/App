import React,{ useState,useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElement/Card';
import ErrorModal from '../../shared/components/UIElement/ErrorModel';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
    VALIDATOR_EMAIL, 
    VALIDATOR_MINLENGTH, 
    VALIDATOR_REQUIRE
 } from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode,setIsLoginMode]= useState(true);
    const {isLoading,error,sendRequest,clearError} = useHttpClient()

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
                name:undefined,
                image:undefined
                
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
           setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            },
            image:{
                value:null,
                isValid:false
            }
           },false)
        }

        setIsLoginMode(prevMode =>!prevMode)
    }

    const authSubmitHandler = async event=>{
      event.preventDefault();

      console.log(formState.inputs);

      if (isLoginMode) {
            try {
                
              const responseData =  await sendRequest(
                   'http://localhost:5000/api/users/login',
                   'POST',
                   JSON.stringify({
                       email:formState.inputs.email.value,
                       password:formState.inputs.password.value
                   }),{
                      'Content-Type':'application/json'
                  },
                );
                       
                auth.login(responseData.user.id);
            } catch (error) {
                
            }
      } else {
        
        try {
        
            const responseData= await sendRequest('http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name:formState.inputs.name.value,
                    email:formState.inputs.email.value,
                    password:formState.inputs.password.value
                }),
                {
                'Content-Type':'application/json'
               }
             );
             auth.login(responseData.user.id);
        } catch (err) {
            
        }
      }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={ clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
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
                    {!isLoginMode && <ImageUpload  center id="image" onInput={inputHandler} />}
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
                    autoComplete="on"
                    validators={[VALIDATOR_MINLENGTH(6)]} 
                    errorText="Please enter a valid password (at least 6 character)"
                    onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ?'LOGIN':'SIGNUP'}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}>Switch TO {!isLoginMode ?'LOGIN':'SIGNUP'}</Button>
            </Card>
      </React.Fragment>

  )
}

export default Auth

