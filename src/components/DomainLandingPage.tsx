import React from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCart, DollarSign, MessageSquare } from 'lucide-react'

interface DomainLandingPageProps {
  domains: Array<{
    id: string
    name: string
    listPrice: number
  }>
}

const DomainLandingPage: React.FC<DomainLandingPageProps> = ({ domains }) => {
  const { domainName } = useParams<{ domainName: string }>()
  const domain = domains.find(d => d.name === domainName)

  if (!domain) {
    return <div className="text-center py-20">Domain not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">{domain.name}</h1>
          <p className="text-xl">This domain is for sale!</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              ${domain.listPrice.toLocaleString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Buy it now price</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Buy Now
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
              <DollarSign className="mr-2" size={20} />
              Make Offer
            </button>
          </div>
          <div className="text-center">
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center mx-auto">
              <MessageSquare className="mr-2" size={20} />
              Contact Us
            </button>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Domain Manager. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default DomainLandingPage