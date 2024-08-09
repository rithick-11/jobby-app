import {Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Header = () => {

  const naviagte = useNavigate()

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    naviagte('/login')
  }
  return (
    <div className="bg-[#272727] flex items-center px-3 md:px-[3rem] py-2 justify-between">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="h-10"
        />
      </Link>
      <div className="hidden  md:flex items-center text-white font-bold gap-4">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        className="hidden md:block px-3 py-1 bg-[#6366f1] text-md font-bold text-white rounded"
        onClick={logoutUser}
      >
        Logout
      </button>
      <div className="text-white text-2xl font-bold flex items-center gap-5 md:hidden">
        <Link to="/">
          <AiFillHome />
        </Link>
        <Link to="/jobs">
          <FaBriefcase />
        </Link>
        <button type="button" onClick={logoutUser}>
          <FiLogOut />
        </button>
      </div>
    </div>
  )
}

export default Header
