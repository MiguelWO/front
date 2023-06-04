import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [error, setErrors] = useState('')
  const navigate = useNavigate()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors('')
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // console.log('handleSubmit')

    const user = {
      username: name,
      email: email,
      password: password,
    }

    // console.log(user)

    // 54.162.20.236
    // axios.post('http://localhost:4000/api/auth/register', { user }, { withCredentials: true })
    //   .then(response => {
    //     if (response.data.status === 'created') {
    //       redirect()
    //     } else {
    //       setErrors(response.data.errors)
    //     }
    //   })
    //   .catch(error => console.log('api errors:', error))

    // axios.post('http://localhost:4000/api/auth/register', {user})
    //   .then(response => {
    //     if (response.data.status === 'created') {
    //       redirect()
    //     } else {
    //       setErrors(response.data.errors)
    //     }
    //   })
    //   .catch(error => console.log('api errors:', error))

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', user)
      if (response.data.message === 'User created successfully') {
        setRegistrationSuccess(true)
        redirect()
      }
    } catch (error) {
      console.log('api errors:', error)
      setErrors(error.response.data)

    }

    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')
  }

  const redirect = () => {
    navigate('/login')
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5">Registration</h1>
      {registrationSuccess && <div className="alert alert-success" role="alert">Registration successful!</div>}
      {error && <div className="alert alert-danger" role="alert">{error.msg}</div>}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

            <div>
              or <a href='/login'>login</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );

};

export default RegistrationPage