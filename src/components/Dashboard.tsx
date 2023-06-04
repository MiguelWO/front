import React, {useState, useEffect} from 'react'
import withAuth from './withAuth.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [authorUsername, setAuthorUsername] = useState({})


    // const getAuthorUsername = async (authorId: string) => {
    //     try {
    //         const response = await axios.get(`http://localhost:4000/api/users/${authorId}`)
    //         return response.data.username
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/posts')
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    useEffect(() => {
        const getAuthorUsername = async () => {
            const author = posts.map((post: any) => post.author);
            try {
                const uniqueAuthorIds = [...new Set(author)];
                const authorUserMap = {};

                for( const authorId of uniqueAuthorIds) {
                    // console.log(authorId)
                    const response = await axios.get(`http://localhost:4000/api/users/${authorId}`)
                    authorUserMap[authorId] = response.data.username
                }
                setAuthorUsername(authorUserMap)
            } catch (error) {
                console.log(error)
            }
        }
        getAuthorUsername()
    }, [posts])




  return (
    <div className="container">
        <h1 className="text-center mb-5">Dashboard</h1>
        {posts.length > 0 ? (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {posts.map((post: any) => (
                        <Card className="text-center" key={post._id}>
                            <Card.Header>
                                {authorUsername[post.author]? (
                                    authorUsername[post.author]
                                ) : (
                                    post.author
                                )}
                                {/* {post.author} */}
                                </Card.Header>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.body}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    ))}
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
                <Card>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>

                </div> */}
            {/* </div> */}
        </div>
  )
}

export default withAuth(Dashboard)