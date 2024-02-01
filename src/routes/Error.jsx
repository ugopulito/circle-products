import React from 'react';
import { Link } from 'react-router-dom';
import '../style/error.scss'

const Error = () => {
    return (
        <div className='error'>
            <img className='logo' src="/src/assets/Logo.svg" alt="logo Circle Products" />
            <p>
                Nous sommes désolés, cette page est introuvable...
            </p>
            <Link to={'/'}>Retour à l'accueil</Link>
        </div>
    );
};

export default Error;