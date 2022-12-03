import React,{ useEffect,useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModel from '../../shared/components/UIElement/ErrorModel';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';

const Users = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(); 
  const [loadedUsers,setLoadedUsers]= useState();
    useEffect(()=>{
      setIsLoading(true);
      const fetchUsers = async ()=>{
        try {
          setError(null);
          const response = await fetch('http://localhost:5000/api/users',{
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
          setLoadedUsers(responseData.users);
        } catch (err) {
          setIsLoading(false);
          setError(err.message || 'Something went wrong, please try again');
        }
      }
      fetchUsers();
    },[]);
  
    const errorHandler = ()=>{
      setError(null)
  }

  return (
        <React.Fragment>
          <ErrorModel error={error} onClear={errorHandler} />
          {isLoading && <div className='center'>
            <LoadingSpinner/>
            </div>}
    { !isLoading &&  loadedUsers &&<UsersList item={loadedUsers} />}
      </React.Fragment>
  )
}

export default Users
