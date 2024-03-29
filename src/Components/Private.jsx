import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext';
const PrivateRoute = () => {
    // let auth = { 'token': false }
    let { user } = useContext(AuthContext)
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}
export default PrivateRoute;