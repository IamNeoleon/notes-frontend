import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { MoveLeft, Trash2 } from 'lucide-react'
import { deleteNote, selectNotes } from '../store/slices/notesSlice';
import { motion } from 'framer-motion';

import NoteBlock from '../components/Note/NoteBlock';


const NotePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { notes } = useAppSelector(selectNotes);
    const note = notes.find(note => note._id === id?.toString());
    const token = localStorage.getItem('token');

    const handleBack = () => {
        console.log('clicked back');
        navigate('/dashboard')
    }

    const handleDelete = async () => {
        if (token) {
            if (id) {
                await dispatch(deleteNote({ token, id }))
                navigate('/dashboard')
            }
        }
    }
    const notePageVariants = {
        initial: {
            opacity: 0,
            scale: 0.8,
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
    };


    return (
        <>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={notePageVariants}
            >
                <div className="notePage">
                    <div className="container">
                        <div className="note-top">
                            <div onClick={handleBack} className="note-back">
                                <MoveLeft size={24} color='#fff' />
                            </div>
                            <div onClick={handleDelete} className="note-delete">
                                <Trash2 size={24} color='#fff' />
                            </div>
                        </div>
                        {
                            note && <NoteBlock id={note._id} title={note.title} content={note.content} date={note.createdAt} />
                        }
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default NotePage;