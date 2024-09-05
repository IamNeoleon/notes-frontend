import React from 'react';
import { Link } from 'react-router-dom';

import styles from './noteCard.module.scss'
import { getFormattedDate } from '../../utils/getFormattedDate';

interface INoteCardProps {
    id: string,
    title: string,
    content: string,
    date: string
}

const NoteCard: React.FC<INoteCardProps> = ({ id, title, content, date }) => {
    const formattedDate = getFormattedDate(date);

    return (
        <>
            <Link to={`/note/${id}`}>
                <div className={styles.card}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{content}</div>
                    <div className={styles.date}>{formattedDate}</div>
                </div>
            </Link>
        </>
    );
};

export default NoteCard;