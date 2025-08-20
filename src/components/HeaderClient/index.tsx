import './styles.css';
import { Link, NavLink } from 'react-router-dom';
import iconAdmin from '../../assets/admin.svg';
import addIcon from '../../assets/add.svg';
import homeIcon from '../../assets/home.svg';
import * as authService from '../../services/auth-service';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../LoggedUser';
import deliveredIcon from '../../assets/deliver.svg';
import logo from '../../assets/logo.svg';
import itemsIcon from '../../assets/products.svg';

export default function HeaderClient() {

    const { contextTokenPayload } = useContext(ContextToken);

    return (
        <header className="tfr-header-client">
            <nav className="tfr-container">
                <Link to="/" className="tfr-logo-container">
                    <img src={logo} alt="Logo" className="tfr-logo" />
                    <h1>Lost and Found WEB APP</h1>
                </Link>
                <div className="tfr-navbar-right">
                    <div className="tfr-menu-items-container">
                        {
                            contextTokenPayload &&
                            authService.hasAnyRoles(['ROLE_ADMIN', 'ROLE_VIGILANTE']) &&
                            <>
                                 <NavLink to="/client" end className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}>
                                    <div className="tfr-menu-item">
                                        <img src={homeIcon} alt="Home" />
                                        <p>Início</p>
                                    </div>
                                  </NavLink>

                                <NavLink to="/client/itemlosts" className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}>
                                    <div className="tfr-menu-item">
                                        <img src={itemsIcon} alt="Itens Perdidos" />
                                        <p>Itens</p>
                                    </div>
                                </NavLink>
                                
                                <NavLink to="/client/itemlosts/create" className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}>
                                    <div className="tfr-menu-item">
                                        <img src={addIcon} alt="Adicionar Item" />
                                        <p>Adicionar</p>
                                    </div>
                                </NavLink>
                                <NavLink to="/client/delivered-items" className={({isActive}) => isActive ? "tfr-menu-item-active" : ""}>
                                    <div className="tfr-menu-item">
                                        <img src={deliveredIcon} alt="Itens Entregues" />
                                        <p>Entregues</p>
                                    </div>
                                </NavLink>
                                
                                {/* --- INÍCIO DA CORREÇÃO --- */}
                                {/* Adicionada uma verificação específica apenas para ROLE_ADMIN */}
                                {
                                    authService.hasAnyRoles(['ROLE_ADMIN']) &&
                                    <Link to="/admin">
                                        <div className="tfr-menu-item">
                                            <img src={iconAdmin} alt="Admin" />
                                            <p>Admin</p>
                                        </div>
                                    </Link>
                                }
                                {/* --- FIM DA CORREÇÃO --- */}
                            </>
                        }
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}