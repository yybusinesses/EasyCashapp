import JobSwiper from './components/JobSwiper'
import Navigation from './components/Navigation'
import SecurePayment from './components/SecurePayment'
import PremiumFeatures from './components/PremiumFeatures'
import ReviewSystem from './components/ReviewSystem'

export default function Home() {
  return (
    <div className="w-full max-w-md mx-auto pb-20">
      <header className="text-center mb-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-2 animate-pulse">Easy Cash</h1>
        <p className="text-xl text-white">Swipe Your Way to Success</p>
      </header>
      <JobSwiper />
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Secure Payments</h2>
        <SecurePayment />
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Premium Features</h2>
        <PremiumFeatures />
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">Review System</h2>
        <ReviewSystem />
      </div>
      <Navigation />
    </div>
  )
}

