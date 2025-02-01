'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { Toast } from '@/components/Toast'

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationSelectorProps {
  onLocationSelect: (location: {
    type: 'REMOTE' | 'ON_SITE' | 'HYBRID';
    coordinates?: Coordinates;
    address?: string;
    radius?: number;
  }) => void;
  initialValue?: {
    type: 'REMOTE' | 'ON_SITE' | 'HYBRID';
    address?: string;
    radius?: number;
  };
}

export function LocationSelector({ onLocationSelect, initialValue }: LocationSelectorProps) {
  const [locationType, setLocationType] = useState<'REMOTE' | 'ON_SITE' | 'HYBRID'>(initialValue?.type || 'REMOTE')
  const [address, setAddress] = useState(initialValue?.address || '')
  const [radius, setRadius] = useState(initialValue?.radius || 50)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const debouncedAddress = useDebounce(address, 500)

  useEffect(() => {
    if (locationType === 'REMOTE') {
      onLocationSelect({ type: 'REMOTE' })
      return
    }

    if (debouncedAddress) {
      const geocodeAddress = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(debouncedAddress)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}`
          )
          const data = await response.json()
          
          if (data.results?.[0]?.geometry?.location) {
            const { lat, lng } = data.results[0].geometry.location
            onLocationSelect({
              type: locationType,
              coordinates: { latitude: lat, longitude: lng },
              address: debouncedAddress,
              radius
            })
          } else {
            setError('Location not found')
          }
        } catch (error) {
          setError('Failed to get location coordinates')
          console.error('Geocoding failed:', error)
        } finally {
          setIsLoading(false)
        }
      }

      geocodeAddress()
    }
  }, [debouncedAddress, locationType, radius, onLocationSelect])

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocationType(e.target.value as 'REMOTE' | 'ON_SITE' | 'HYBRID')
  }

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value))
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="locationType" className="block text-sm font-medium mb-2">
          Job Location Type
        </label>
        <select
          id="locationType"
          value={locationType}
          onChange={handleTypeChange}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
        >
          <option value="REMOTE">Remote</option>
          <option value="ON_SITE">On-site</option>
          <option value="HYBRID">Hybrid</option>
        </select>
      </div>

      {locationType !== 'REMOTE' && (
        <>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              Location
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter address or city"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="radius" className="block text-sm font-medium mb-2">
              Search Radius (km)
            </label>
            <input
              id="radius"
              type="range"
              min="1"
              max="500"
              value={radius}
              onChange={handleRadiusChange}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{radius} km</span>
          </div>
        </>
      )}

      {error && (
        <Toast
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      
      {isLoading && (
        <div className="text-sm text-gray-600">
          Loading location data...
        </div>
      )}
    </div>
  )
} 