'use client'
import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude?: number;
  longitude?: number;
  error?: string;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: true
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocation is not supported'
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false
        })
      },
      (error) => {
        setState({
          loading: false,
          error: error.message
        })
      }
    )
  }, [])

  return state
} 