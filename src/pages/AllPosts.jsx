import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { motion } from 'framer-motion';

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
