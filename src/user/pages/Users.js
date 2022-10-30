import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const  USERS = [
    {
    id:"ui",
    name:"Rocking Star Yash",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8P702UfX3COx7FPvYJFUFL49CgZ9MJbbR2A&usqp=CAU",
    places: 4
  }
]; 
  return (
      <UsersList item={USERS} />
  )
}

export default Users
