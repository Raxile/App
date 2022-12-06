import React, { useContext } from 'react'
import { NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css'

const NavLinks = (props) => {
   const auth = useContext(AuthContext);


  return (
    
     <ul className='nav-links'>
      <li>
       <NavLink exact="true" to="/" >ALL USERS</NavLink> 
     </li>
       {/* RENDER WHEN LOGED IN */}
     {auth.isLoggedIn && (
     <li>
       <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink> 
     </li>
     )}  
     {/* RENDER WHEN LOGED IN */}
      {auth.isLoggedIn &&(
      <li>
       <NavLink to="/places/new">ADD PLACES </NavLink> 
     </li>
     )}
     {/* RENDER WHEN NOT LOGED IN */}
      {!auth.isLoggedIn &&(
      <li>
       <NavLink to="/auth">AUTHENTICATE</NavLink> 
     </li>  
     )}
     {auth.isLoggedIn &&(
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
     )}
    </ul> 
    
  )
};

export default NavLinks
