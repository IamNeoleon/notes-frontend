import React, { useState } from 'react';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';


const Auth: React.FC = () => {
    const [registered, setRegistered] = useState<boolean>(true);

    const toggleRegistered = () => {
        setRegistered(prevState => !prevState);
    };
    return (
        <>
            <div className="auth">
                {
                    registered ? <Login toggleRegistered={toggleRegistered} /> : <Register toggleRegistered={toggleRegistered} />
                }
            </div>
        </>
    );
};

export default Auth;