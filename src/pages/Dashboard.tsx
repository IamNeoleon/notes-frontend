import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { quit } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion';

import NoteCard from '../components/NoteCard/NoteCard';
import { createNote, fetchNotes, resetCreatingState, selectNotes } from '../store/slices/notesSlice';
import { jwtDecode } from 'jwt-decode';

const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { notes, loading, creating, lastCreatedNoteId } = useAppSelector(selectNotes);
    const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const storedToken = localStorage.getItem('token');
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
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

    const handleCreateNote = async () => {
        if (storedToken) {
            await dispatch(createNote(storedToken));
        }
    }
    useEffect(() => {
        if (creating === 'succeeded') {
            navigate(`/note/${lastCreatedNoteId}`)
            dispatch(resetCreatingState());
        }
    }, [creating, lastCreatedNoteId]);

    useEffect(() => {
        if (!storedToken) {
            navigate('/auth')
        } else {
            dispatch(fetchNotes(storedToken))
        }
    }, [navigate]);

    useEffect(() => {
        if (storedToken) {
            try {
                const decodedToken: any = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem('token');
                    navigate('/auth');
                }
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/auth');
            }
        } else {
            navigate('/auth');
        }
    }, [])

    return (
        <>
            <motion.div initial='initial' animate='animate' exit='exit' variants={pageVariants}>
                <div className="dashboard">
                    <div className="container">
                        <div className="notes">
                            {
                                loading === 'pending' ? (
                                    <div className='loading'>Loading...</div>
                                ) : (
                                    sortedNotes.map((note, index) => (
                                        <NoteCard
                                            key={index}
                                            id={note._id}
                                            title={note.title}
                                            content={note.content}
                                            date={note.createdAt}
                                        />
                                    ))
                                )
                            }
                        </div>
                        <div onClick={handleCreateNote} className="add-note">
                            <Plus width={24} color='#fff' />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Dashboard;