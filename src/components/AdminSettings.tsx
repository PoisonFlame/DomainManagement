import React from 'react'

interface AdminSettingsProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  ssoEnabled: boolean
  setSsoEnabled: (ssoEnabled: boolean) => void
}

const AdminSettings: React.FC<AdminSettingsProps> = ({
  darkMode,
  setDarkMode,
  ssoEnabled,
  setSsoEnabled,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Admin Settings</h2>
      
      <div className="flex items-center justify-between">
        <label htmlFor="darkMode" className="text-gray-700 dark:text-gray-300">
          Dark Mode
        </label>
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="ssoEnabled" className="text-gray-700 dark:text-gray-300">
          Enable SSO
        </label>
        <input
          type="checkbox"
          id="ssoEnabled"
          checked={ssoEnabled}
          onChange={(e) => setSsoEnabled(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>

      {ssoEnabled && (
        <div className="space-y-4">
          <div>
            <label htmlFor="ssoProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              SSO Provider
            </label>
            <select
              id="ssoProvider"
              name="ssoProvider"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Auth0</option>
              <option>Okta</option>
              <option>Google</option>
            </select>
          </div>
          <div>
            <label htmlFor="ssoClientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Client ID
            </label>
            <input
              type="text"
              name="ssoClientId"
              id="ssoClientId"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="ssoDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              SSO Domain
            </label>
            <input
              type="text"
              name="ssoDomain"
              id="ssoDomain"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSettings