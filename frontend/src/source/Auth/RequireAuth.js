import { useContext } from "react";
import Login from "../../pages/Login";
import AuthContext from "./AuthContext";
import Authenticated from "../../pages/Authenticated";
function RequireAuth({ children }) {
    const auth = useContext(AuthContext);

    const { user } = auth;

    if (!user) {
        return <Login/>
    }
    return (<Authenticated children={children}></Authenticated>);
}

export default RequireAuth