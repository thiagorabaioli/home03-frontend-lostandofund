import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import './styles.css';

export default function Footer() {

   

    return (
        <footer className="tfr-footer">
            <div className="tfr-container">
                <div className="tfr-footer-content">
                    <p>Projeto criado por Thiago Rabaioli</p>
                    <p>contact: tfrabaioli@gmail.com</p>
                    <p>© {new Date().getFullYear()} Lost and Found WEB APP</p>
                </div>
            </div>
        </footer>
    );
}