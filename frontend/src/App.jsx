import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {

  // 🔹 Logout Component: Clears localStorage and redirects to login page
  const Logout = () => {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  // 🔹 RegisterAndLogout: Clears localStorage and shows Register page
  const RegisterAndLogout = () => {
    localStorage.clear()
    return <Register />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* ✅ Protected Home Route (Only logged-in users can access) */}
          <Route path='/' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />

          {/* ✅ Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />

          {/* 🚫 Fallback Route - If no route matches */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
