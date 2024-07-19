import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await authService.logout(); 
            dispatch(logout()); 
            navigate('/Login'); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <motion.button
            onClick={logoutHandler}
            className='inline-block px-6 py-2 duration-200 bg-gray-700 hover:bg-red-500 rounded-full text-white'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            Logout
        </motion.button>
    );
}

export default LogoutBtn;
