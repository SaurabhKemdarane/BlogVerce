import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div
            className="relative flex items-center justify-center text-white text-6xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-75 rounded-full blur-lg"></div>
            <motion.div
                className="relative"
                whileHover={{ textShadow: "0px 0px 8px rgb(255, 255, 255)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                BlogVerce
            </motion.div>
        </motion.div>
    );
};

export default Logo;
