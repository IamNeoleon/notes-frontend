import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getFormattedDate } from '../../utils/getFormattedDate';
import { Pencil, Check } from 'lucide-react';


import styles from './noteBlock.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectNotes, updateNote } from '../../store/slices/notesSlice';
import { selectAuth } from '../../store/slices/authSlice';


interface INoteBlockProps {
    id: string,
    title: string,
    content: string,
    date: string
}

const NoteBlock: React.FC<INoteBlockProps> = ({ id, title, content, date }) => {
    const dispatch = useAppDispatch();
    const formattedDate = getFormattedDate(date);
    const [edit, setEdit] = useState<boolean>(false);
    const [valueTitle, setValueTitle] = useState<string>(title)
    const [valueContent, setValueContent] = useState<string>(content)
    const [characters, setСharacters] = useState<number>(0);
    const { lastCreatedNoteId } = useAppSelector(selectNotes)
    const token = localStorage.getItem('token')
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const countСharacters = () => {
        setСharacters(valueContent.length);
    }

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Сброс высоты
            textarea.style.height = `${textarea.scrollHeight}px`; // Установка новой высоты
        }
    };

    const handleClickEdit = () => {
        setEdit(true);
    }

    const handleApply = async () => {
        if (valueTitle === '' || valueContent === '') {
            alert('Title and text are required')
        } else {
            if (token) {
                await dispatch(updateNote({
                    id: id,
                    title: valueTitle,
                    content: valueContent,
                    token: token
                }))
                setEdit(false);
            }
        }
    }

    useEffect(() => {
        if (lastCreatedNoteId === id) {
            setEdit(true);
            setValueTitle('')
            setValueContent('')
        }
    }, [lastCreatedNoteId, id]);

    useLayoutEffect(() => {
        adjustTextareaHeight();
    }, [valueContent, edit]);

    useEffect(() => {
        countСharacters();
    }, [valueContent])

    return (
        <>
            <div className={styles.note}>
                <div className={styles.top}>
                    <input placeholder='Enter title' readOnly={!edit} type='text' className={styles.title} value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                    <div className={styles.info}>
                        <div className={styles.date}>{formattedDate}</div>
                        <div className={styles.symbols}>{characters} symbols</div>
                    </div>
                </div>
                <div className="wrapper">
                    <textarea
                        placeholder='Enter text'
                        ref={textareaRef}
                        style={{ overflow: 'hidden', resize: 'none' }}
                        readOnly={!edit}
                        onChange={(e) => setValueContent(e.target.value)}
                        value={valueContent}
                        className={styles.content}
                    />
                </div>
                <div className={styles.action}>
                    {
                        edit ? (
                            <div onClick={handleApply} className={styles.apply}>
                                <Check color='#fff' size={24} />
                            </div>
                        ) : (
                            <div onClick={handleClickEdit} className={styles.edit}>
                                <Pencil color='#fff' size={24} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default NoteBlock;