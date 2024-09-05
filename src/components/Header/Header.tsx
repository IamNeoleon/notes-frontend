import React, { useEffect, useState } from 'react';
import { CircleUserRound, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfo, selectUser } from '../../store/slices/userSlice';
import classNames from 'classnames';
import { quit } from '../../store/slices/authSlice';


const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const userInfo = useAppSelector(selectUser)
    const [actions, setActions] = useState<boolean>(false);

    useEffect(() => {
        if (token) {
            dispatch(fetchUserInfo(token))
        }
    }, [])
    const handleQuit = () => {
        localStorage.removeItem('token')
        dispatch(quit())
        navigate('/')
    }
    return (
        <>
            <header className="header">
                <div className="header__inner">
                    <div className="header__logo">
                        Neo Notes
                    </div>
                    <nav className='nav'>
                        <Link to='/dashboard' className='nav__link'>
                            <Home size={24} color='#fff' />
                            <span>Home</span>
                        </Link>
                        <div className="header__profile" onClick={() => setActions(prev => !prev)}>
                            <div className="header__info">
                                <CircleUserRound size={24} color='#fff' />
                                <span>{userInfo?.name}</span>
                            </div>
                            <div className={classNames("header__actions", { "visible": actions })}>
                                <div className="header__action header__profile-info">Profile</div>
                                <div className='header__action header__quit' onClick={handleQuit}>Quit</div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;