import React from 'react'
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  onLogout: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <LogOut className="mr-1" size={18} /> Log Out
    </button>
  )
}

export default LogoutButton