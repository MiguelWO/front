import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (user) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
        navigate("/dashboard");
        }
    }, [user, navigate]);
    }

export default useAuth;