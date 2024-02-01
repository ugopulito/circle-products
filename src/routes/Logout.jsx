//Page de redirection au Logout
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/logout.scss'

const Logout = () => {
    return (
        <div className='logout'>
            <img className='logo' src="src/assets/Logo.svg" alt="logo Circle Products" />
            <p>
                Vous avez été déconnecté
            </p>
            <Link to={'/products'}>Retour à l'accueil</Link>
        </div>
    );
};

export default Logout;