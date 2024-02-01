import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import '../style/root.scss'
import { emptyLocalStorage } from '../helpers';

const Root = () => {
    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }
    return (
        <>
            <div className={`left-col ${visibility ? '' : 'mobile-hidden'}`}>
                <img className='logo' src="/src/assets/Logo.svg" alt="logo Circle Products" />
                <nav>
                    <li><NavLink to={'/dashboard'} onClick={toggleVisibility}>Dashboard</NavLink></li>
                    <li><NavLink to={'/products'} onClick={toggleVisibility}>Products management</NavLink></li>
                    <li><NavLink to={'/employees'} onClick={toggleVisibility}>Employees management</NavLink></li>
                    <li><Link to={'/logout'} onClick={emptyLocalStorage}>Logout</Link></li>
                </nav>
            </div>
            <div className="right-col">
                <button onClick={toggleVisibility} className="menu-icons mobile-only"><img className='logo' src={`/src/assets/${ !visibility ? 'menu-icon.svg' : 'close-icon.svg'}`} alt="Icône de menu" /></button>
                <Outlet/>
            </div>
        </>
    );
};

export default Root;