import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Social Media Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registration</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation