import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserBookings = ({token,userId}) => {
  const [bookings,setBookings]=useState([])
  const [bookingError,setBookingError]=useState(null) 

  useEffect(()=>{
    const fetchBookings = async()=>{
      if(!token || !userId){
        return

      }
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}/booking/`,
          {
            headers:{
              Authorization: `Token ${token}`
            }
          }
        )
        console.log("Booking data = ",response.data)
        setBookings(response.data)
        console.log("checking for user bookings = ",response.data)
        
      } catch (error) {
       console.log("fetching details failed",error)
       setBookingError(
        error.response?.data?.message
       )
      }
    }
    fetchBookings()
  },[token,userId])
  return (
    <div>
      {bookings.map((item)=>{
        return(
          <div>
            {item.user}--
            {item.bus}--
            {item.seat}--
            {item.booking_time}

           </div>
         
        )
      })}
    </div>
  )
}

export default UserBookings