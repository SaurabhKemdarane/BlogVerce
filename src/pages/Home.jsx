import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HorizontalLoadingBar from '../components/HorizontalLoadingBar';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts();
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                dispatch(login(currentUser));
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
                <HorizontalLoadingBar />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
                <Link to='/signup'>
                    <motion.h1
                        className="text-4xl font-bold mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Welcome to BlogVerce
                    </motion.h1>
                </Link>
                <motion.div
                    className="max-w-4xl p-8 bg-zinc-800 shadow-md rounded-lg mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <p className="text-lg">
                        Welcome to BlogVerce, the ultimate platform for passionate bloggers! Share your thoughts, ideas, and stories with a global audience. Connect with like-minded individuals and explore diverse perspectives on a wide range of topics.
                    </p>
                    <p className="mt-4">
                        BlogVerce offers a seamless blogging experience with powerful tools to help you create and manage your posts effortlessly. Join us today and become part of a vibrant community of writers and readers.
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className='w-full py-8 bg-zinc-800 text-white'>
            <Container>
                <div className='flex flex-wrap justify-center' style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {posts.map((post) => (
                        <motion.div
                            key={post.$id}
                            className='p-2 w-full md:w-1/2 lg:w-1/4'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <PostCard {...post} />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
