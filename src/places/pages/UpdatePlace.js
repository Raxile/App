import React,{useEffect, useState,useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElement/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import {useHttpClient} from '../../shared/hooks/http-hook'
import {AuthContext} from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import ErrorModel from '../../shared/components/UIElement/ErrorModel';
import './PlaceForm.css'



const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    const [loadedPlace,setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const navigate = useNavigate(); 
     
    const [formState,inputHandler ,setFormData] = useForm({
      title:{
        value:'',
        isValid:false
      },
      description:{
        value:'',
        isValid:false
      }
    },false);

   useEffect(()=>{
   const fetchPlace = async ()=>{
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
      setLoadedPlace(responseData.place);
      setFormData({
        title:{
          value:responseData.place.title,
          isValid:true
        },
        description:{
          value:responseData.place.description,
          isValid:true
        }
      })

    } catch (error) { }
   }
   fetchPlace();
   },[sendRequest,placeId,setFormData]);

    
    
    const placeSubmitHandler =async (event) =>{
      event.preventDefault();
      try {
        await sendRequest(`http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title:formState.inputs.title.value,
          description:formState.inputs.description.value
         }),{
           'Content-Type':'application/json'
         });
          navigate('/'+auth.userId+'/places');
      } catch (err) {console.log(err)
      console.log(placeId)
      }
      
    }
    if(isLoading){
        return(
         <div className='center'> 
           <LoadingSpinner/>
         </div>
        );
    }
    
    if(!loadedPlace && !error){
        return (
        <div className='center'>
            <Card>
            <h2>Could not find place! </h2>
            </Card>
         </div>
       );    
    }


  return (
    <React.Fragment>
      <ErrorModel error={error}  onClear={clearError}/>
     {!isLoading && loadedPlace && (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title" 
        validators={[ VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid title"
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
       />
      <Input 
        id="description"
        element="textarea" 
        label="Description" 
        validators={[ VALIDATOR_MINLENGTH(5)]} 
        errorText="please enter a valid Desceiption (min 5 character)"
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
       />
       <Button type="submit" disabled={!formState.isValid} >Update Place</Button>
    </form>)}
    </React.Fragment>
  )
}

export default UpdatePlace
