import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([])
  const [bookingError, setBookingError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}/booking/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setBookings(response.data)
      } catch (error) {
        console.log('Fetching bookings failed', error)
        setBookingError(error.response?.data?.message || 'Error fetching bookings')
      }
    }
    fetchBookings()
  }, [token, userId])

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Your Bookings</h2>
      {bookingError && <p className="text-red-600 mb-4">{bookingError}</p>}
      {bookings.length === 0 ? (
        <p className="text-gray-700">No bookings found.</p>
      ) : (
        bookings.map((item, index) => (
          <div
            key={index}
            className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p><strong>User:</strong> {item.user}</p>
            <p><strong>Bus:</strong> {item.bus}</p>
            <p><strong>Seat:</strong> {item.seat}</p>
            <p><strong>Booking Time:</strong> {item.booking_time}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default UserBookings