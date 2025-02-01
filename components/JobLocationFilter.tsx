'use client'
import React from 'react'
import { LocationSelector } from './LocationSelector'
import { LocationMap } from './LocationMap'
import { SearchFilters } from '@/types/shared'

interface JobLocationFilterProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

export function JobLocationFilter({ onFilterChange, currentLocation }: JobLocationFilterProps) {
  const handleLocationSelect = (location: {
    type: 'REMOTE' | 'ON_SITE' | 'HYBRID';
    coordinates?: { latitude: number; longitude: number };
    address?: string;
    radius?: number;
  }) => {
    onFilterChange({
      jobType: [location.type],
      ...(location.coordinates && {
        location: {
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
          radius: location.radius || 50
        }
      })
    })
  }

  return (
    <div className="space-y-6">
      <LocationSelector onLocationSelect={handleLocationSelect} />
      
      {currentLocation && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Current Location</h3>
          <LocationMap
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          />
        </div>
      )}
    </div>
  )
} 