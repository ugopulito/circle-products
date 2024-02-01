//Page provisoire pour toutes les sections en cours de développement 
import React from 'react';
import '../style/inProgress.scss'
import { Link } from 'react-router-dom';

const InProgress = () => {
    return (
        <div className="in-progress">
            <img src="/src/assets/manufacturing-icon.svg" alt="icône d'engrenages" />
            <p>Cette section est en cours de construction, vous pouvez consulter la section "Products management" en cliquant sur le lien ci-dessous ou via le menu</p>
            <Link to={'/products'}>Products management</Link>
        </div>
    );
};

export default InProgress;