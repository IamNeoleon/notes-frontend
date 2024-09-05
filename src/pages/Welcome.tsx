import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 70,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: {
                duration: 0.5,
            },
        },
    };

    const handleStart = () => {
        navigate('/dashboard')
    }

    return (
        <>
            <motion.div initial='initial' animate='animate' exit='exit' variants={pageVariants}>
                <div className="welcome">
                    <div className="welcome__title">
                        Best Notes App
                    </div>
                    <div className="welcome__text">
                        <p>This is the most convenient notes app that is ideal for everyday use.</p>
                        <p>Try it, and after this there will be no other alternatives for you)</p>
                    </div>
                    <button onClick={handleStart} className="welcome__start">Get started</button>
                </div>
            </motion.div>
        </>
    );
};

export default Welcome;