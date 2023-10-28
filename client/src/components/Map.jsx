import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Map = () => {
  
  const position = [51.505, -0.09]
  return (
    <div className='w-full h-[24rem] bg-slate-400'>
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
      </MapContainer>
      </div>
  )
}

export default Map
