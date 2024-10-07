import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Edit2, Save, X, ExternalLink } from 'lucide-react'
import { Domain } from './DomainManager'

interface DomainListProps {
  domains: Domain[]
  isAuthenticated: boolean
  onRemove: (id: string) => void
  onUpdate: (domain: Domain) => void
}

const DomainList: React.FC<DomainListProps> = ({ domains, isAuthenticated, onRemove, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedDomain, setEditedDomain] = useState<Domain | null>(null)

  const startEditing = (domain: Domain) => {
    setEditingId(domain.id)
    setEditedDomain({ ...domain })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditedDomain(null)
  }

  const saveEditing = () => {
    if (editedDomain) {
      onUpdate(editedDomain)
      setEditingId(null)
      setEditedDomain(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedDomain) {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
      setEditedDomain({ ...editedDomain, [e.target.name]: value })
    }
  }

  // Filter out sold domains
  const availableDomains = domains.filter(domain => !domain.isSold)

  return (
    <div className="space-y-4">
      {availableDomains.map((domain) => (
        <div key={domain.id} className="bg-white dark:bg-gray-700 shadow rounded-lg p-4">
          {editingId === domain.id ? (
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={editedDomain?.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="number"
                name="listPrice"
                value={editedDomain?.listPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder="List Price"
              />
              <input
                type="number"
                name="purchasePrice"
                value={editedDomain?.purchasePrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder="Purchase Price"
              />
              <select
                name="type"
                value={editedDomain?.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="for-sale">For Sale</option>
                <option value="personal-use">Personal Use</option>
                <option value="development">Development</option>
                <option value="parked">Parked</option>
              </select>
              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  name="isSold"
                  checked={editedDomain?.isSold}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Sold</span>
              </label>
              <div className="flex justify-end space-x-2">
                <button onClick={saveEditing} className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
                  <Save size={18} />
                </button>
                <button onClick={cancelEditing} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{domain.name}</h3>
                <span className="text-green-600 dark:text-green-400 font-bold">${domain.listPrice.toLocaleString()}</span>
              </div>
              {isAuthenticated && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Purchase Price: ${domain.purchasePrice.toLocaleString()}</p>
                  <p>Estimated Value: ${domain.estimatedValue.toLocaleString()}</p>
                  <p>Type: {domain.type}</p>
                  <p>Registrar: {domain.registrar}</p>
                  <p>Expiry Date: {new Date(domain.expiryDate).toLocaleDateString()}</p>
                  <p>Created: {new Date(domain.creationDate).toLocaleDateString()}</p>
                  <p>Last Updated: {new Date(domain.lastUpdated).toLocaleDateString()}</p>
                  <p>Nameservers: {domain.nameservers.join(', ')}</p>
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-2">
                <Link to={`/domain/${domain.name}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  <ExternalLink size={18} />
                </Link>
                {isAuthenticated && (
                  <>
                    <button onClick={() => startEditing(domain)} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => onRemove(domain.id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      {availableDomains.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No available domains to display.</p>
      )}
    </div>
  )
}

export default DomainList