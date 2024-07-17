import React from 'react';
import { motion } from 'framer-motion';

function HorizontalLoadingBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <motion.div
                className="h-2 bg-red-600"
                initial={{ width: '20%' }}
                animate={{ width: '80%' }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                }}
            />
        </div>
    );
}

export default HorizontalLoadingBar;
