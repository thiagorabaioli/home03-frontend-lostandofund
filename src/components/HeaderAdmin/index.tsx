import './styles.css';
import homeIcon from '../../assets/home.svg';
import productsIcon from '../../assets/products.svg'; 
import userIcon from '../../assets/admin.svg'; 
import LoggedUser from '../LoggedUser';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function HeaderAdmin() {

    return (
        <header className="dsc-header-admin">
            <nav className="dsc-container">
                <div className="dsc-logo-container">
                    <img src={logo} alt="Logo" className="dsc-logo" />
                    <h1>Lost and Found APP - Admin</h1>
                </div>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        <NavLink 
                            to="/client"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
                                <img src={homeIcon} alt="Início" />
                                <p>Início</p>
                            </div>
                        </NavLink>

                      
                        <NavLink 
                            to="/admin/users"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
                                <img src={userIcon} alt="Utilizadores" />
                                <p>Utilizadores</p>
                            </div>
                        </NavLink>

                       
                        <NavLink 
                            to="/client"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
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