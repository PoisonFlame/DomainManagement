import React from 'react'
import { Domain } from './DomainManager'

interface DomainStatisticsProps {
  domains: Domain[]
}

const DomainStatistics: React.FC<DomainStatisticsProps> = ({ domains }) => {
  const totalDomains = domains.length
  const totalOwningCost = domains.reduce((sum, domain) => sum + domain.purchasePrice, 0)
  const totalPortfolioValue = domains.reduce((sum, domain) => sum + domain.listPrice, 0)
  const totalEstimatedValue = domains.reduce((sum, domain) => sum + domain.estimatedValue, 0)

  const currentDate = new Date()
  const domainsNeedingRenewal = domains.filter(domain => {
    const expiryDate = new Date(domain.expiryDate)
    const daysDifference = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))
    return daysDifference <= 30 // Consider domains expiring within 30 days as needing renewal
  }).length

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Domain Portfolio Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Domains" value={totalDomains} />
        <StatCard title="Total Owning Cost" value={`$${totalOwningCost.toLocaleString()}`} />
        <StatCard title="Total Portfolio Value" value={`$${totalPortfolioValue.toLocaleString()}`} />
        <StatCard title="Total Estimated Value" value={`$${totalEstimatedValue.toLocaleString()}`} />
        <StatCard title="Domains Needing Renewal" value={domainsNeedingRenewal} />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
  </div>
)

export default DomainStatistics