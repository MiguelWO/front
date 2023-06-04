import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password
      })
      localStorage.setItem('token', data.token)
      const decoded: any = jwtDecode(data.token)
      setToken(data.token)
      setUsername('')
      setPassword('')
      setError('')
      console.log(decoded)
      setLoginSuccess(true)
      navigate('/dashboard')
      
    } catch (error) {
      setError(error.response.data)
    }
  };

  // 54.162.20.236
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()
  //   try {
  //     const { data } = await axios.post('http://54.162.20.236:3000/api/auth/login', {
  //       email,
  //       password
  //     })
  //     localStorage.setItem('token', data.token)
  //     const decoded: any = jwtDecode(data.token)
  //     setToken(data.token)
  //     setEmail('')
  //     setPassword('')
  //     setError('')
  //     console.log(decoded)
  //     navigate('/dashboard')

  //   } catch (error) {
  //     setError(error.response.data)
  //   }
  // };



  return (
    <div className="container">
      <h1 className="text-center mb-5">Login</h1>
      {loginSuccess && <p className="text-success">Login successful!</p>}
      {error && <p className="text-danger">{error.msg}</p>}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {token && <p className="mt-5">Token: {token}</p>}
        </div>
      </div>
    </div>
  )
}

export default LoginPage