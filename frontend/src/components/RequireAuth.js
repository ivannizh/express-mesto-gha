import {Navigate} from "react-router-dom";

export default function RequireAuth({children, loggedIn}) {
    return (
        loggedIn ? children : <Navigate to='/sign-in'/>
    )
}
