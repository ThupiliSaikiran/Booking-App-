import React,{useState} from 'react'
import axios from 'axios'

const RegisterForm = ()=> {
  const [form, setForm] = useState({
    username:'',email:'',password:''
  })
  const [message,setMessage]=useState()
  const handleChnage = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:8000/api/register/',form)
      setMessage('Registration Successful')
    }
    catch(error){
      setMessage("Registartion failed" +(error.response?.data?.username?.[0] || error.message))
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username"  value={form.username} onChange={handleChnage}/><br />
          <label htmlFor="">Email</label>
          <input type="email" name="email"  value={form.email} onChange={handleChnage}/><br />
          <label htmlFor="">Password</label>
          <input type="password" name="password"  value={form.password} onChange={handleChnage}/><br />
          <button type="submit">Register</button>
          {message && <p>{message}</p> }
        </div>
      </form>
    </div>
  )
}

export default RegisterForm