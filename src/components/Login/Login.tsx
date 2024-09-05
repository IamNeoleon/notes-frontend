import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAuth, selectAuth } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss'


interface ILoginProps {
    toggleRegistered: () => void;
}

const Login: React.FC<ILoginProps> = ({ toggleRegistered }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { token, loading } = useAppSelector(selectAuth)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(fetchAuth({ email, password }));
    }
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
            console.log('Успешный вход');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (loading === 'failed') {
            alert('Не удалось войти, неверный логин и/или пароль');
        }
    }, [loading]);

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.wrapper}>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.wrapper}>
                    <label className={styles.label} htmlFor="password">Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div >
                <button className={styles.btn} type="submit" >Login</button>
                <div className={styles.haveAccount}>
                    <span>Don't have account? <u onClick={toggleRegistered}>Login</u></span>
                </div>
            </form >
        </>
    );
};

export default Login;