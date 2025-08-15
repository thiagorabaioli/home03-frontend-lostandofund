
import './styles.css';
import homeIcon from '../../assets/home.svg';
import LoggedUser from '../LoggedUser';
import { NavLink } from 'react-router-dom';

import userIcon from '../../assets/user.svg'; // Supondo que tem um ícone de utilizador

export default function HeaderAdmin() {
    return (
        <header className="dsc-header-admin">
            <nav className="dsc-container">
                <h1>Lost and Found APP - Admin</h1>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        <NavLink to="/admin/home" /* ... */ >
                            {/* ... */}
                        </NavLink>
                        {/* ADICIONAR ESTE LINK */}
                        <NavLink 
                            to="/admin/users"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
                                <img src={userIcon} alt="Utilizadores" />
                                <p>Utilizadores</p>
                            </div>
                        </NavLink>
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}