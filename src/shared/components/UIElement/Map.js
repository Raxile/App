import React from 'react'

import './Map.css'
const Map = (props) => {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <img src="https://d32ogoqmya1dw8.cloudfront.net/images/sp/library/google_earth/google_maps_hello_world.jpg" alt="map pic"/>
    </div>
  )
}

export default Map
