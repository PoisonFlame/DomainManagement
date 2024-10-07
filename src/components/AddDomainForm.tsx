import React, { useState } from 'react'
import { X } from 'lucide-react'

interface AddDomainFormProps {
  onAdd: (domain: string, listPrice: number, purchasePrice: number, type: string) => void
  onCancel: () => void
}

const AddDomainForm: React.FC<AddDomainFormProps> = ({ onAdd, onCancel }) => {
  const [domain, setDomain] = useState('')
  const [listPrice, setListPrice] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [type, setType] = useState('for-sale')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain.trim() && listPrice && purchasePrice) {
      onAdd(domain.trim(), Number(listPrice), Number(purchasePrice), type)
      setDomain('')
      setListPrice('')
      setPurchasePrice('')
      setType('for-sale')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain name"
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <input
        type="number"
        value={listPrice}
        onChange={(e) => setListPrice(e.target.value)}
        placeholder="List Price"
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="Purchase Price"
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="for-sale">For Sale</option>
        <option value="personal-use">Personal Use</option>
        <option value="development">Development</option>
        <option value="parked">Parked</option>
      </select>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </form>
  )
}

export default AddDomainForm