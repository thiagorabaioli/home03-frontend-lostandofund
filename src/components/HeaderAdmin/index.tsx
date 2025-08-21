import './styles.css';
import homeIcon from '../../assets/home.svg';
import productsIcon from '../../assets/products.svg'; 
import userIcon from '../../assets/admin.svg'; 
import LoggedUser from '../LoggedUser';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function HeaderAdmin() {

    return (
        <header className="tfr-header-admin">
            <nav className="tfr-container">
                <div className="tfr-logo-container">
                    <img src={logo} alt="Logo" className="tfr-logo" />
                    <h1>Perdidos e Achandos  - Admin</h1>
                </div>
                <div className="tfr-navbar-right">
                    <div className="tfr-menu-items-container">
                        <NavLink 
                            to="/client"
                            className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}
                        >
                            <div className="tfr-menu-item">
                                <img src={homeIcon} alt="Início" />
                                <p>Início</p>
                            </div>
                        </NavLink>

                      
                        <NavLink 
                            to="/admin/users"
                            className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}
                        >
                            <div className="tfr-menu-item">
                                <img src={userIcon} alt="Utilizadores" />
                                <p>Utilizadores</p>
                            </div>
                        </NavLink>

                       
                        <NavLink 
                            to="/client"
                            className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}
                        >
                            <div className="tfr-menu-item">
                                <img src={productsIcon} alt="Itens Perdidos" />
                                <p>Itens</p>
                            </div>
                        </NavLink>
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}