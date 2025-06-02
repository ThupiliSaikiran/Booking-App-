import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null)
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  
  const { busId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true)
        const response = await axios(`http://localhost:8000/api/buses/${busId}`)
        setBus(response.data)
        setSeats(response.data.seats || [])
      } catch (error) {
        console.log("Error in Fetching details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBusDetails()
  }, [busId])

  const handleBook = async (seatId) => {
    if (!token) {
      setNotification({
        show: true,
        message: 'Please login to book a seat',
        type: 'warning'
      })
      setTimeout(() => {
        navigate("/login")
      }, 1500)
      return
    }
    try {
      const response = await axios.post("http://localhost:8000/api/booking/",
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        })
      setNotification({
        show: true,
        message: 'Booking Successful!',
        type: 'success'
      })
      setSeats((prevSeats) => {
        return prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      })
    } catch (error) {
      setNotification({
        show: true,
        message: error.response?.data?.error || "Booking failed",
        type: 'error'
      })
    }
  }

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          'bg-yellow-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-xl mx-auto px-4">
        {/* Header Section */}
        {bus && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{bus.bus_name}</h1>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <span>Bus #{bus.number}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Available
              </span>
            </div>
          </div>
        )}

        {/* Journey Details */}
        {bus && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-base font-medium text-gray-900">{bus.origin}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="w-12 h-0.5 bg-gray-200 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="text-base font-medium text-gray-900">{bus.destination}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{bus.start_time} - {bus.reach_time}</span>
              </div>
            </div>
          </div>
        )}

        {/* Seats Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Select Your Seat</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 rounded-full"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
            </div>
          </div>

          <div className="max-w-xs mx-auto">
            {/* Driver's Seat */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-2">
              {Array.from({ length: Math.ceil(seats.length / 4) }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-4 gap-2">
                  {seats.slice(rowIndex * 4, (rowIndex + 1) * 4).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleBook(seat.id)}
                      disabled={seat.is_booked}
                      className={`
                        relative p-2 rounded-lg text-center transition-all duration-300
                        ${seat.is_booked 
                          ? 'bg-red-50 text-red-600 cursor-not-allowed' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100 hover:scale-105'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <svg 
                          className={`w-4 h-4 ${seat.is_booked ? 'text-red-500' : 'text-green-500'}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <span className="text-xs font-medium">Seat {seat.seat_number}</span>
                        {seat.is_booked && (
                          <span className="text-[10px] text-red-500">Booked</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusSeats