import Link from 'next/link'
import { Home, Search, PlusCircle, User } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-4">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          <Home />
        </Link>
        <Link href="/search" className="text-gray-600 hover:text-blue-500">
          <Search />
        </Link>
        <Link href="/post-job" className="text-gray-600 hover:text-blue-500">
          <PlusCircle />
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-blue-500">
          <User />
        </Link>
      </div>
    </nav>
  )
}

