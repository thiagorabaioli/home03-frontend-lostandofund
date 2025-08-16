import './styles.css';
import homeIcon from '../../assets/home.svg';
import productsIcon from '../../assets/products.svg'; 
import userIcon from '../../assets/admin.svg'; // Reutilizando o ícone de admin para utilizadores
import LoggedUser from '../LoggedUser';
import { NavLink } from 'react-router-dom';

export default function HeaderAdmin() {

    return (
        <header className="dsc-header-admin">
            <nav className="dsc-container">
                <h1>Lost and Found APP - Admin</h1>
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

                        {/* LINK DE UTILIZADORES RESTAURADO */}
                        <NavLink 
                            to="/admin/users"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
                                <img src={userIcon} alt="Utilizadores" />
                                <p>Utilizadores</p>
                            </div>
                        </NavLink>

                        {/* LINK DE ITENS MANTIDO */}
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