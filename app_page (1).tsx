import JobSwiper from './components/JobSwiper'
import Navigation from './components/Navigation'
import SecurePayment from './components/SecurePayment'
import PremiumFeatures from './components/PremiumFeatures'
import ReviewSystem from './components/ReviewSystem'

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto pb-20">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Easy Cash</h1>
        <p className="text-xl text-gray-600">Swipe Your Way to Success</p>
      </header>
      <JobSwiper />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Secure Payments</h2>
        <SecurePayment />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Premium Features</h2>
        <PremiumFeatures />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Review System</h2>
        <ReviewSystem />
      </div>
      <Navigation />
    </div>
  )
}

