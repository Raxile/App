import React ,{useEffect ,useState}from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import ErrorModel from '../../shared/components/UIElement/ErrorModel';

const UserPlaces = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(); 
    const [loadedPlaces,setLoadedPlaces] = useState()


    const userId = useParams().userId;

    useEffect( ()=>{

      const fetchUsers = async ()=>{
          try {
            setError(null);
            const response = await fetch(`http://localhost:5000/api/places/user/${userId}`,{
              method:'GET',
              headers:{
                'Content-Type':'application/json'
            }
            });
             const responseData =await response.json();
             if(!response.ok){
              throw new Error(responseData.message)
           }
           setIsLoading(false);
            setLoadedPlaces(responseData.places);
          } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again');
          }
        }
        fetchUsers();
      },[userId]);
      
      const errorHandler = ()=>{
        setError(null)
      }
    
     const placeDeleteHandler =  (deletedPlaceId)=>{
      setLoadedPlaces(prevPlaces=>prevPlaces.filter(place => place.id !== deletedPlaceId ))
     }

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler}/>
      {isLoading && <div className='center'><LoadingSpinner/></div>}
    {!isLoading&& loadedPlaces &&<PlaceList items={loadedPlaces} onDelete={placeDeleteHandler}/>}
    </React.Fragment>
  )
}

export default UserPlaces
