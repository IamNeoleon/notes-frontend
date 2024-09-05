import axios from 'axios';
import React, { useState } from 'react';
import styles from './register.module.scss'
import { useNavigate } from 'react-router-dom';

interface IRegisterProps {
    toggleRegistered: () => void;
}

const Register: React.FC<IRegisterProps> = ({ toggleRegistered }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            console.log(response.data);

            if (response.data) {
                console.log('Success');
                navigate('/auth')
            } else {
                console.log('Error');
            }
            // Здесь можно сохранить токен или перенаправить пользователя
        } catch (error) {
            console.error('Ошибка регистрации', error);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.wrapper}>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button className={styles.btn} type="submit" >Register</button>
                <div className={styles.haveAccount}>
                    <span>Already have an account? <u onClick={toggleRegistered}>Register</u></span>
                </div>
            </form >
        </>
    );
};

export default Register;