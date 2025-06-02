import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [message, setMessage] = useState()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/login/', form)
      setMessage("Login Success")

      if (onLogin) {
        onLogin(response.data.token, response.data.user_id)
      }
      navigate("/")
    } catch (error) {
      setMessage(`Login failed: ${error}`)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 max-w-sm mx-auto">
      {/* Logo and Title */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 bg-white/90 rounded-full flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="text-sm text-gray-600">Sign in to your account</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full pl-8 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 hover:border-blue-400"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-8 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 hover:border-blue-400"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-1/2 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Register
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        {message && (
          <div className={`text-center py-2 px-3 rounded-lg text-xs ${
            message.includes('Success') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

export default LoginForm