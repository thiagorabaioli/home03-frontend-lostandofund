import './styles.css';
import { Link, NavLink } from 'react-router-dom'; // 1. Importar o NavLink
import iconAdmin from '../../assets/admin.svg';
import addIcon from '../../assets/add.svg';
import homeIcon from '../../assets/home.svg';
import * as authService from '../../services/auth-service';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../LoggedUser';
import deliveredIcon from '../../assets/deliver.svg';
import logo from '../../assets/logo.svg';
import itemsIcon from '../../assets/products.svg'; // 2. Importar o ícone para os itens

export default function HeaderClient() {

    const { contextTokenPayload } = useContext(ContextToken);

    return (
        <header className="dsc-header-client">
            <nav className="dsc-container">
                <Link to="/" className="dsc-logo-container">
                    <img src={logo} alt="Logo" className="dsc-logo" />
                    <h1>Lost and Found WEB APP</h1>
                </Link>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        {
                            contextTokenPayload &&
                            authService.hasAnyRoles(['ROLE_ADMIN', 'ROLE_VIGILANTE']) &&
                            <>
                                 <NavLink to="/client" end className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                                    <div className="dsc-menu-item">
                                        <img src={homeIcon} alt="Home" />
                                        <p>Início</p>
                                    </div>
                                  </NavLink>

                                {/* 3. ADICIONAR O NOVO LINK AQUI */}
                                <NavLink to="/client/itemlosts" className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                                    <div className="dsc-menu-item">
                                        <img src={itemsIcon} alt="Itens Perdidos" />
                                        <p>Itens</p>
                                    </div>
                                </NavLink>
                                
                                <NavLink to="/client/itemlosts/create" className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                                    <div className="dsc-menu-item">
                                        <img src={addIcon} alt="Adicionar Item" />
                                        <p>Adicionar</p>
                                    </div>
                                </NavLink>
                                <NavLink to="/client/delivered-items" className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                                    <div className="dsc-menu-item">
                                        <img src={deliveredIcon} alt="Itens Entregues" />
                                        <p>Entregues</p>
                                    </div>
                                </NavLink>
                                <Link to="/admin">
                                    <div className="dsc-menu-item">
                                        <img src={iconAdmin} alt="Admin" />
                                        <p>Admin</p>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}