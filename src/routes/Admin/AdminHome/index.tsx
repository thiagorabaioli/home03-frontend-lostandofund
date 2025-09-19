import './styles.css';
import { useEffect, useState } from 'react';
import { UserDTO } from '../../../models/user';
import * as userService from '../../../services/user-service';

export default function AdminHome() {

    const [user, setUser] = useState<UserDTO>();

    useEffect(() => {
        userService.findMe()
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            });
    }, [])

    return (
        <main>
            <section id="admin-home-section" className="tfr-container">
                <h2 className="tfr-section-title tfr-mb20">Bem-vindo à área administrativa Utilizador:  {user?.name}</h2>
            </section>
        </main>
    );
}
