import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Globe } from 'lucide-react'
import Navbar from './components/Navbar'
import DomainManager from './components/DomainManager'
import AdminSettings from './components/AdminSettings'
import DomainLandingPage from './components/DomainLandingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showAdminSettings, setShowAdminSettings] = useState(false)
  const [ssoEnabled, setSsoEnabled] = useState(false)
  const [domains, setDomains] = useState([])

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
    document.documentElement.classList.toggle('dark', darkMode)

    const savedDomains = localStorage.getItem('domains')
    if (savedDomains) {
      setDomains(JSON.parse(savedDomains))
    }
  }, [darkMode])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowAdminSettings(false)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
  }

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            showAdminSettings={showAdminSettings}
            setShowAdminSettings={setShowAdminSettings}
          />
          <Routes>
            <Route path="/" element={
              <div className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-6">
                    <Globe className="mr-2" /> Domain Manager
                  </h1>
                  {showAdminSettings && isAuthenticated ? (
                    <AdminSettings
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      ssoEnabled={ssoEnabled}
                      setSsoEnabled={setSsoEnabled}
                    />
                  ) : (
                    <DomainManager 
                      isAuthenticated={isAuthenticated} 
                      domains={domains}
                      setDomains={setDomains} 
                    />
                  )}
                </div>
              </div>
            } />
            <Route path="/domain/:domainName" element={<DomainLandingPage domains={domains} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App