'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
]

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleLanguageChange = (languageCode: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${languageCode}`)
    router.push(newPath)
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="text-xl">🌐</span>
        <span>{languages.find(lang => lang.code === currentLocale)?.name}</span>
      </button>
      
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
              currentLocale === language.code ? 'bg-gray-50 dark:bg-gray-800' : ''
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  )
} 