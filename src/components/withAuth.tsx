import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const withAuth = (Component: any) => {
    const AuthRoute = (props) => {
        const history = useNavigate()
        // console.log(props)
    
        useEffect(() => {
        const token = localStorage.getItem('token')
        // console.log(token)
        if (!token) {
            console.log('no token')
            history('/login')
        } else {
            try{
                const { exp }: any = jwtDecode(token)
                const expirationTime = (exp * 1000) - 60000
                if (Date.now() >= expirationTime) {
                    console.log('expired token')
                    history('/login');
                }
                
            } catch (e) {
                console.log(e)
                history('/login')
            }
        }
        }, [history] )
        return <Component  />
    }
    return AuthRoute;
    };

export default withAuth;