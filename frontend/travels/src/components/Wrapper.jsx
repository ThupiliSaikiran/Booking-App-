import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Wrapper = ({handleLogout,token,children}) => {
  const navigate=useNavigate()
  const logout = ()=>{
    handleLogout()
    navigate("/")
  }
  return (
    <div>
      {token ? ( 
        <button onClick={logout}>Logout</button>):
      <Link to="/login">
      <button>Login</button>
      </Link>
      }
      <div>{children}</div>
    </div>
  )
}

export default Wrapper