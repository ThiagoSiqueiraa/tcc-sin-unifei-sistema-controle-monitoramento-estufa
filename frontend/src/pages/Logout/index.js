import { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import AuthContext from "../../source/Auth/AuthContext";

const Logout = () => {
    const auth = useContext(AuthContext)

    const navigate = useNavigate();
    
    useEffect(() => {
        auth.signout()
        navigate("/", { replace: true });
    }, []);
    
    return null
}

export default Logout