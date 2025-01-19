import Link from 'next/link'
import { Home, Search, PlusCircle, User, CreditCard } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex justify-around py-4 max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="/post-job" className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition-colors">
          <PlusCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Post Job</span>
        </Link>
        <Link href="/payments" className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition-colors">
          <CreditCard className="w-6 h-6" />
          <span className="text-xs mt-1">Payments</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  )
}

