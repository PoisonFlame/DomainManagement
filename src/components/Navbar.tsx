import React from 'react'
import { Sun, Moon, Settings, LogIn, LogOut } from 'lucide-react'

interface NavbarProps {
  isAuthenticated: boolean
  onLogin: () => void
  onLogout: () => void
  darkMode: boolean
  toggleDarkMode: () => void
  showAdminSettings: boolean
  setShowAdminSettings: (show: boolean) => void
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  darkMode,
  toggleDarkMode,
  showAdminSettings,
  setShowAdminSettings,
}) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-semibold text-xl text-gray-800 dark:text-white">Domain Manager</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isAuthenticated && (
              <button
                onClick={() => setShowAdminSettings(!showAdminSettings)}
                className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <Settings size={20} />
              </button>
            )}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogIn size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar