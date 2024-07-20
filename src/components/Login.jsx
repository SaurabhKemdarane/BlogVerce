import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);

            if (session) {
                try {
                    const userData = await authService.getCurrentUser();

                    if (userData) {
                        dispatch(authLogin(userData));
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to fetch user data.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen bg-zinc-900'>
            <div className='mx-auto w-full max-w-lg bg-[#3a429a11] rounded-xl p-10 border border-gray-700'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight text-white'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-gray-400'>
                    Don&apos;t have an account?&nbsp;
                    <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                },
                            })}
                            className='bg-gray-700 text-white'
                        />
                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true,
                            })}
                            className='bg-gray-700 text-white'
                        />
                        <Button type='submit' className='w-full bg-gray-600 hover:bg-gray-700'>
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
            <hr className='w-1/2 mt-8 mb-4 border-gray-500 border-t-2' />
            <ToastContainer />
        </div>
    );
}

export default Login;
