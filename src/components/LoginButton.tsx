import React from 'react'
import { LogIn } from 'lucide-react'

interface LoginButtonProps {
  onLogin: () => void
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
  return (
    <button
      onClick={onLogin}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <LogIn className="mr-1" size={18} /> Log In
    </button>
  )
}

export default LoginButton