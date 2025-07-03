import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()))
  }

  return (
    <button
      onClick={logoutHandler}
      className="px-5 py-2 text-sm font-semibold transition-all duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full shadow hover:shadow-md"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
