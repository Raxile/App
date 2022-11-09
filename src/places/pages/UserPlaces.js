import React from 'react'
import { useParams } from 'react-router-dom'


import PlaceList from '../components/PlaceList'

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

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (

    <PlaceList items={loadedPlaces}/>
  )
}

export default UserPlaces
