import React ,{useContext}from 'react';
import {useNavigate} from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModel from '../../shared/components/UIElement/ErrorModel';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';


const NewPlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading,error,sendRequest,clearError} =useHttpClient()
   const [formState,inputHandler]=  useForm(
      {
        title:{
          value:'',
          isValid:false
        },
        description:{
          value:'',
          isValid:false
        },
        address:{
          value:'',
          isValid:false
        }
      },
      false
     )
     
     const navigate =useNavigate()


    const placeSubmitHandler = async event => {
    event.preventDefault();
    try{

      await  sendRequest('http://localhost:5000/api/places','POST',JSON.stringify({
        title:formState.inputs.title.value,
        description:formState.inputs.description.value,
        address:formState.inputs.address.value,
        creator: auth.userId
      }),{
        'Content-Type':'application/json'
      });
       navigate('/');
    }catch(err){
       
    }
    
    };

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={clearError} />
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
     <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="please enter a valid Title"
      onInput={inputHandler}
      /> 
     <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="please enter a valid description (at least 5 character)"
      onInput={inputHandler}
      />
     <Input
      id="address"
      element="input"
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="please enter a valid address"
      onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
        </Button> 
    </form>
    </React.Fragment>
  )
}

export default NewPlace
