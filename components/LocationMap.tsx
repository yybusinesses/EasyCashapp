'use client'
import React from 'react'
import { GoogleMap, LoadScript, Marker, Libraries } from '@react-google-maps/api'

const libraries: Libraries = ['places']

interface LocationMapProps {
  latitude: number;
  longitude: number;
  radius?: number; // in kilometers
}

const mapContainerStyle = {
  width: '100%',
  height: '300px'
}

export function LocationMap({ latitude, longitude, radius }: LocationMapProps) {
  const center = {
    lat: latitude,
    lng: longitude
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={radius ? Math.log2(20000/radius) : 12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
} 