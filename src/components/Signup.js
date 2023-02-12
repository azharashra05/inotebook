import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [user, setUser] = useState({name:"",email:"",password:""})
  let navigate=useNavigate()
  const onChange=(e)=>
  {
    setUser({...user,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault()
    const response=await fetch(`http://localhost:5000/api/auth/createuser`,
      {
        method:'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:user.name,email:user.email,password:user.password})
      }
      )
      const json=await response.json()
      console.log(json)
      if(json.success)
      {
        //Save the auth token and redirect
        localStorage.setItem('token',json.authToken)
        navigate('/')
        props.showAlert("Account created successfully","success")
      }
      else
      {
        props.showAlert(json.error,"danger")
      }
  }
  return (
    <div className='container mt-2'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange} minLength={5} required/>
        </div>
        <button disabled={user.name.length<3 || user.password.length<5} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
