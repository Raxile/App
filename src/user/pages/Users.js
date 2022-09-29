import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const  USERS = [
    {
    id:"ui",
    name:"Piyush Saxena",
    image:"https://w0.peakpx.com/wallpaper/630/316/HD-wallpaper-yash-attitude-bollywood-kannada-kgf-kgf2-movies-rocky-rocky-bhai-style.jpg",
    places: 4
  }
]; 
  return (
      <UsersList item={USERS} />
  )
}

export default Users
