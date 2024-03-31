import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

interface MapProps {
  center: { lat: number; lng: number }
  markers: { lat: number; lng: number }[]
}

const markerIcon = L.icon({
  iconUrl: '/icons/map-marker.png',
  iconSize: [37, 37],
  iconAnchor: [19, 37],
  popupAnchor: [0, -25],
})

// A map component with wonderful open-source software from Leaflet and OpenStreetMap.

const Map: React.FC<MapProps> = ({ center, markers }) => {
  return (
    <div className='leaflet duration-300 overflow-hidden rounded-lg'>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className='h-[300px] z-10'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers.map((position) => (
          <Marker
            key={`marker ${position.lat};${position.lng}`}
            position={position}
            icon={markerIcon}
          >
            <Popup>{`${position.lat};${position.lng}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
