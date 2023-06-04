import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import withAuth from './withAuth.tsx';

const PostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [postSuccess, setPostSuccess] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:4000/api/posts', {
                headers : {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                title,
                content
            })
            setPostSuccess(true)
            setTitle('')
            setContent('')
            setError('')
            console.log(data)
        } catch (error) {
            setError(error.response.data)
        }
    };
  return (
    <div className="container">
        <h1 className="text-center mb-5">Create Post</h1>
        {error && <p className="text-danger">{error.message}</p>}
        {postSuccess && <p className="text-success">Post created successfully!</p>}
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control" id="content" rows={3}></textarea>
                    </div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    </div>    
  )
}

export default withAuth(PostForm)