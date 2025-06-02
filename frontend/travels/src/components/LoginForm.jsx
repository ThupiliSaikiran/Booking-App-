import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LoginForm = ({onLogin})=> {
  const [form, setForm] = useState({
    username:'',password:''
  })
  const [message,setMessage]=useState()
  const navigate = useNavigate()

  const handleChnage = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8000/api/login/',form)
      setMessage("Login Sucess")

      if(onLogin){
        onLogin(response.data.token,response.data.user_id)
      }
      navigate("/")

    }
    catch(error){
      setMessage(`Login failed:${error}`)
    }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username"  value={form.username} onChange={handleChnage}/><br />
         
          <label htmlFor="">Password</label>
          <input type="password" name="password"  value={form.password} onChange={handleChnage}/><br />
          <button type="submit">Login</button>
          {message && <p>{message}</p> }
        </div>
      </form>
    </div>
  )
}

export default LoginForm