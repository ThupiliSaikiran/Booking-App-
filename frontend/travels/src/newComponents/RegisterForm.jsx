import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
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
      await axios.post('http://localhost:8000/api/register/', form)
      setMessage('Registration Successful')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setMessage("Registration failed: " + (error.response?.data?.username?.[0] || error.message))
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 max-w-sm mx-auto">
      {/* Logo and Title */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 bg-white/90 rounded-full flex items-center justify-center shadow-md">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">BusBooking</h1>
        <p className="text-sm text-gray-600">Create Your Account</p>
      </div>

      {/* Registration Form */}
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
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-8 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 hover:border-blue-400"
                placeholder="Enter your email"
                value={form.email}
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
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-1/2 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Back to Login
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        {message && (
          <div className={`text-center py-2 px-3 rounded-lg text-xs ${
            message.includes('Successful') 
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

export default RegisterForm