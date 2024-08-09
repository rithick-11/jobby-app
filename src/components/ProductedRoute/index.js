import Cookies from 'js-cookie'
import {Navigate, Outlet} from 'react-router-dom'

const ProductedRoute = props => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Navigate to="/login" />
  }
  return <Outlet {...props} />
}

export default ProductedRoute
