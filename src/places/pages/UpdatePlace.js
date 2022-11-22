import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './PlaceForm.css'

const DUMMY_PLACES =[
    {
      id:'p1',
      title:'Zsquare',
      description:'building',
      imageUrl:'https://yometro.com/images/places/z-square-mall.jpg',
      address:'Mall Rd, Downtown, Kanpur, Uttar Pradesh 208001',
      location:{
        lat:26.4732591,
        lng:80.3528144
      },
      creator:'u1'
  
    },
    {
      id:'p2',
      title:'Zsquare',
      description:'building',
      imageUrl:'https://lh5.googleusercontent.com/p/AF1QipP2FqGbyFnzMphR7IyopB7ZbhDqiM2Cweo4-PNI=w408-h544-k-no',
      address:'Mall Rd, Downtown, Kanpur, Uttar Pradesh 208001',
      location:{
        lat:26.4732591,
        lng:80.3528144
      },
      creator:'u2'
  
    },
  
  ]

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    const [formState,inputHandler] = useForm({
      title:{
       value:identifiedPlace.title,
       isValid:true
      },
      description:{
        value:identifiedPlace.description,
        isValid:true
      }
    },true)
    
    const placeSubmitHandler = event =>{
      event.preventDefault();
      console.log(formState.inputs)
    }

    if(!identifiedPlace){
        return (
        <div className='center'>
            <h2>Could not find place! </h2>
         </div>
       ); 
        
    }
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title" 
        validators={[ VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
       />
      <Input 
        id="description"
        element="textarea" 
        label="Description" 
        validators={[ VALIDATOR_MINLENGTH(5)]} 
        errorText="please enter a valid Desceiption (min 5 character)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
       />
       <Button type="submit" disabled={!formState.isValid} >Update Place</Button>
    </form>
  )
}

export default UpdatePlace