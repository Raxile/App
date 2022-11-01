import React from 'react'
import { NavLink} from 'react-router-dom'
import './NavLinks.css'

const NavLinks = () => {
  return (
    <>
     <ul className='nav-links'>
      <li>
       <NavLink to={"/"} >ALL USERS</NavLink> 
     </li>
       {/* RENDER WHEN LOGED IN */}
      <li>
       <NavLink to={"/u1/places"}>MY PLACES</NavLink> 
     </li>  
     {/* RENDER WHEN LOGED IN */}
      <li>
       <NavLink to={"/places/new"}>ADD PLACES </NavLink> 
     </li>  
     {/* RENDER WHEN NOT LOGED IN */}
      <li>
       <NavLink to={"/auth"}>AUTHENTICATE</NavLink> 
     </li>  
    </ul> 
    </>
  )
}

export default NavLinks
