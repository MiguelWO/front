import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useState } from 'react';
import withAuth from './withAuth.tsx';

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const  data  = await axios.get('http://localhost:4000/api/posts', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setPosts(data.data)
        setError('')
      } catch (error) {
        setError(error)
      }
    }
    fetchPosts()
  }, [])



  return (
    <div className="container">
      <h1 className="text-center mb-5">Welcome to our Social Media Platform!</h1>
      { error && <p>{error.message}</p> }
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Card className="text-center">
            <Card.Header>Featured</Card.Header>
            {/* <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" className='mr-2'>Like</Button>
                <Button variant="secondary" size="lg">Dislike</Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            {posts.map((post: any) => (
              <Card.Body key={post._id}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.body}
                </Card.Text>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" className='mr-2'>Like</Button>
                  <Button variant="secondary" size="lg">Dislike</Button>
                </div>
              </Card.Body>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default withAuth(HomePage);