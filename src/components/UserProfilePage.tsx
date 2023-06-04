import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import useAuth from './useAuth';


const UserProfilePage = () => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState(null)

  const isAuth = localStorage.getItem('token')

  useAuth(isAuth);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token')
      const decoded: any = jwtDecode(token)
      const userId = decoded.id
      try {
        const response = await axios.get( `http://localhost:4000/api/auth/${userId}`)
        .then(response => {
          setUser(response.data);
        })
      } catch (error) {
        setErrors(error)
      }
    }
    getUser()
  }, [])

  return (
    <div className="container">
      <h1 className="text-center mb-5">User Profile</h1>
      {user ? (
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Card className="text-center">
              <Card.Header>{user.username}</Card.Header>
              <Card.Body>
                <Card.Title>{user.email}</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Card className="text-center">
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </div>
        </div>
      )}
      {/* <div className="row">
        <div className="col-md-6 offset-md-3">
          <Card className="text-center">
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </div>
      </div> */}
    </div>
  )
}

export default UserProfilePage