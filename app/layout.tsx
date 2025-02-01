'use client'
import React, { useState, useEffect } from 'react'
import { Inter } from "next/font/google"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LoadingSkeleton } from '@/components/LoadingState'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsent } from '@/components/CookieConsent'
import { AgeVerification } from '@/components/AgeVerification'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface NavLink {
  href: string;
  label: string;
  group: string;
}

const navLinks: NavLink[] = [
  // Main Navigation
  { href: "/", label: "Home", group: "main" },
  { href: "/marketplace", label: "Marketplace", group: "main" },
  { href: "/business", label: "Business", group: "main" },
  { href: "/community", label: "Community", group: "main" },

  // Features
  { href: "/payments", label: "Payments", group: "features" },
  { href: "/integrations", label: "Integrations", group: "features" },
  { href: "/crm", label: "CRM", group: "features" },
  { href: "/ai-features", label: "AI Features", group: "features" },
  { href: "/rewards", label: "Rewards", group: "features" },
  { href: "/projects", label: "Projects", group: "features" },
  { href: "/security", label: "Security", group: "features" },
  { href: "/productivity", label: "Productivity", group: "features" },
  { href: "/finance", label: "Finance", group: "features" },
  { href: "/skill-verification", label: "Skill Verify", group: "features" },
  { href: "/dispute", label: "Dispute Resolution", group: "features" },
  { href: "/team-builder", label: "Team Builder", group: "features" },
  { href: "/learning", label: "Learning", group: "features" },

  // Company
  { href: "/about", label: "About", group: "company" },
  { href: "/contact", label: "Contact", group: "company" },

  // Auth
  { href: "/auth", label: "Sign Up", group: "auth" }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const darkModePreference = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(darkModePreference)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkMode', (!isDarkMode).toString())
  }

  if (!mounted) return <LoadingSkeleton />

  const groupedLinks = navLinks.reduce((acc, link) => {
    if (!acc[link.group]) acc[link.group] = []
    acc[link.group].push(link)
    return acc
  }, {} as Record<string, NavLink[]>)

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}>
        <AuthProvider>
          <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-xl font-semibold">
                  MyWebApp
                </Link>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4">
                  {Object.entries(groupedLinks).map(([group, links]) => (
                    <div key={group} className="flex space-x-4">
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`hover:text-blue-500 transition-colors ${
                            pathname === link.href ? 'text-blue-500' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? '✕' : '☰'}
                </button>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="md:hidden py-4">
                  {Object.entries(groupedLinks).map(([group, links]) => (
                    <div key={group} className="py-2">
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        {group}
                      </div>
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 hover:text-blue-500 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 py-8">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>

          <footer className="bg-gray-100 dark:bg-gray-800 mt-8">
            <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} MyWebApp. All rights reserved.
            </div>
          </footer>

          <CookieConsent />
          <AgeVerification />
        </AuthProvider>
      </body>
    </html>
  )
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Something went wrong
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
} 