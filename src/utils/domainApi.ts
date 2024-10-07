// This is a mock API function to simulate fetching domain information
export const fetchDomainInfo = async (domainName: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Generate mock data
  const currentDate = new Date()
  const expiryDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
  const creationDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())
  const lastUpdated = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7)

  return {
    registrar: ['GoDaddy', 'Namecheap', 'Google Domains', 'NameSilo'][Math.floor(Math.random() * 4)],
    expiryDate: expiryDate.toISOString(),
    creationDate: creationDate.toISOString(),
    lastUpdated: lastUpdated.toISOString(),
    nameservers: [
      `ns1.${domainName}`,
      `ns2.${domainName}`,
    ],
  }
}

// Mock API function to predict domain value
export const predictDomainValue = async (domainName: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Generate a random value between $100 and $10,000
  const estimatedValue = Math.floor(Math.random() * (10000 - 100 + 1) + 100)

  return estimatedValue
}