import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

 useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))    
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
}, [])



  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-900 font-sans">
      <Header />
      <main className="flex-grow py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
