import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'






function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
  
    checkUser();
  }, [dispatch]);
  
  
  return !loading ? (
    
      <div className='w-full block'>
        <Header />
        <main>
        
       
         <Outlet />
        </main>
        <Footer />
   
    </div>
  ) : null
}

export default App
