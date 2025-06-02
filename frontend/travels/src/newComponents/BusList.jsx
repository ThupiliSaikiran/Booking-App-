import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BusList = ({ token, handleLogout }) => {
  const [buses, setBusses] = useState([])
  const [filteredBuses, setFilteredBuses] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    origin: '',
    destination: '',
    time: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/")
        setBusses(response.data)
        setFilteredBuses(response.data)
      } catch (error) {
        console.log("error in fetching buses", error)
      }
    }
    fetchBuses()
  }, [])

  useEffect(() => {
    let result = buses

    if (filters.search) {
      result = result.filter(bus => 
        bus.bus_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        bus.number.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.origin) {
      result = result.filter(bus => 
        bus.origin.toLowerCase().includes(filters.origin.toLowerCase())
      )
    }

    if (filters.destination) {
      result = result.filter(bus => 
        bus.destination.toLowerCase().includes(filters.destination.toLowerCase())
      )
    }

    if (filters.time) {
      result = result.filter(bus => 
        bus.start_time.includes(filters.time)
      )
    }

    setFilteredBuses(result)
  }, [filters, buses])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleViewSeats = (id) => {
    navigate(`bus/${id}`)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  if (!buses || buses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-bounce mb-4">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Buses Found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Page Header with Quote */}
      <div className="text-center mb-8 bg-white/95 rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-800 mb-3">Safe Journeys Await</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 italic mb-2">
            "Travel is not just about reaching a destination, it's about the journey and the memories we create along the way."
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Available Buses Header */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Available Buses
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-3"></div>
          <p className="text-base font-medium text-gray-600">
            Select a bus to view available seats
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Filters</h3>
            <p className="text-sm text-indigo-600">Refine your bus search</p>
          </div>
          {(filters.search || filters.origin || filters.destination || filters.time) && (
            <button
              onClick={() => setFilters({ search: '', origin: '', destination: '', time: '' })}
              className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear all
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative group">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search bus or number..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-300 group-hover:border-indigo-300"
            />
            <svg className="w-4 h-4 text-indigo-500 absolute left-3 top-3 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Origin Filter */}
          <div className="relative group">
            <input
              type="text"
              name="origin"
              value={filters.origin}
              onChange={handleFilterChange}
              placeholder="Filter by origin..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all duration-300 group-hover:border-purple-300"
            />
            <svg className="w-4 h-4 text-purple-500 absolute left-3 top-3 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Destination Filter */}
          <div className="relative group">
            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              placeholder="Filter by destination..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition-all duration-300 group-hover:border-pink-300"
            />
            <svg className="w-4 h-4 text-pink-500 absolute left-3 top-3 group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Time Filter */}
          <div className="relative group">
            <input
              type="text"
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              placeholder="Filter by departure time..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-300 group-hover:border-indigo-300"
            />
            <svg className="w-4 h-4 text-indigo-500 absolute left-3 top-3 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.origin || filters.destination || filters.time) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              value && (
                <div key={key} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 rounded-full text-sm text-indigo-700 border border-indigo-200 shadow-sm">
                  <span className="capitalize">{key}: {value}</span>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, [key]: '' }))}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Bus List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuses.map((bus) => (
          <div 
            key={bus.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="p-4">
              {/* Bus Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{bus.bus_name}</h2>
                  <p className="text-sm text-gray-600">Bus #{bus.number}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                  Available
                </span>
              </div>

              {/* Journey Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Origin</p>
                  <p className="font-medium text-gray-900">{bus.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium text-gray-900">{bus.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="font-medium text-gray-900">{bus.start_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrival</p>
                  <p className="font-medium text-gray-900">{bus.reach_time}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewSeats(bus.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Seats</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusList