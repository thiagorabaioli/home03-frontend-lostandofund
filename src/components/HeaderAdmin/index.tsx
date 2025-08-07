// thiagorabaioli/frontend-lostandofund/frontend-lostandofund-1eb8ffea46adda1de78a07b005611f8d29e3b159/src/components/HeaderAdmin/index.tsx
import './styles.css';
import homeIcon from '../../assets/home.svg';
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
                            to="/admin/home"
                            className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}
                        >
                            <div className="dsc-menu-item">
                                <img src={homeIcon} alt="Início" />
                                <p>Início</p>
                            </div>
                        </NavLink>
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}