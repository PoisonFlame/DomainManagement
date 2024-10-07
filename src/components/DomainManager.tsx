import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import AddDomainForm from './AddDomainForm'
import DomainList from './DomainList'
import DomainStatistics from './DomainStatistics'
import { fetchDomainInfo, predictDomainValue } from '../utils/domainApi'

export interface Domain {
  id: string
  name: string
  listPrice: number
  purchasePrice: number
  registrar: string
  expiryDate: string
  creationDate: string
  lastUpdated: string
  nameservers: string[]
  isSold: boolean
  type: 'for-sale' | 'personal-use' | 'development' | 'parked'
  estimatedValue: number
}

interface DomainManagerProps {
  isAuthenticated: boolean
  domains: Domain[]
  setDomains: React.Dispatch<React.SetStateAction<Domain[]>>
}

const DomainManager: React.FC<DomainManagerProps> = ({ isAuthenticated, domains, setDomains }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)

  const addDomain = async (domainName: string, listPrice: number, purchasePrice: number, type: Domain['type']) => {
    try {
      const domainInfo = await fetchDomainInfo(domainName)
      const estimatedValue = await predictDomainValue(domainName)
      const newDomain: Domain = {
        id: Date.now().toString(),
        name: domainName,
        listPrice,
        purchasePrice,
        ...domainInfo,
        isSold: false,
        type,
        estimatedValue
      }
      setDomains(prevDomains => {
        const updatedDomains = [...prevDomains, newDomain]
        localStorage.setItem('domains', JSON.stringify(updatedDomains))
        return updatedDomains
      })
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding domain:', error)
    }
  }

  const removeDomain = (id: string) => {
    setDomains(prevDomains => {
      const updatedDomains = prevDomains.filter(domain => domain.id !== id)
      localStorage.setItem('domains', JSON.stringify(updatedDomains))
      return updatedDomains
    })
  }

  const updateDomain = (updatedDomain: Domain) => {
    setDomains(prevDomains => {
      const updatedDomains = prevDomains.map(domain => domain.id === updatedDomain.id ? updatedDomain : domain)
      localStorage.setItem('domains', JSON.stringify(updatedDomains))
      return updatedDomains
    })
  }

  return (
    <div>
      {isAuthenticated && (
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-1" size={18} /> Add Domain
          </button>
        </div>
      )}
      {showStatistics && isAuthenticated && (
        <DomainStatistics domains={domains} />
      )}
      {showAddForm && isAuthenticated && (
        <AddDomainForm onAdd={addDomain} onCancel={() => setShowAddForm(false)} />
      )}
      <DomainList 
        domains={domains}
        isAuthenticated={isAuthenticated} 
        onRemove={removeDomain}
        onUpdate={updateDomain}
      />
    </div>
  )
}

export default DomainManager