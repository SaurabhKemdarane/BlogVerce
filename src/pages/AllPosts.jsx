import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo'; 

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
                <Logo />
                <motion.h1
                    className="text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    There are no posts
                </motion.h1>
                <Link to='/add-post'>
                    <motion.button
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        Add Post
                    </motion.button>
                </Link>
            </div>
        );
    }

    return (
        <div className='w-full min-h-full flex flex-col justify-between bg-zinc-800 text-white rounded-xl p-4'>
            <Container>
                <motion.div
                    className='flex h-full justify-center mb-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {posts.map((post) => (
                        <motion.div
                            key={post.$id}
                            className='p-2 w-1/4'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <PostCard {...post} />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </div>
    );
}

export default AllPosts;
