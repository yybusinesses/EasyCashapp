'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchableEntity, BaseComponentProps } from '@/types/shared'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchProps extends BaseComponentProps {
  onSelect?: (result: SearchableEntity) => void;
  placeholder?: string;
}

export const Search = ({ 
  onSelect, 
  placeholder = "Search projects, users, or skills...",
  className 
}: SearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${debouncedQuery}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchItems();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Searching...
              </div>
            ) : results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    onSelect?.(result);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="font-medium">{result.title}</div>
                  {result.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.description}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 