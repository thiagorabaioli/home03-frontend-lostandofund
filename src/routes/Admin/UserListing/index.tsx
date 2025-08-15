import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCrudDTO } from '../../../models/user-crud';
import * as userService from '../../../services/user-service';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonNextPage from '../../../components/ButtonNextPage'; // IMPORTAR O BOTÃO

// CRIAR UM TIPO PARA OS PARÂMETROS DA QUERY
type QueryParams = {
    page: number;
}

export default function UserListing() {
    const navigate = useNavigate();

    const [isLastPage, setIsLastPage] = useState(false); // ESTADO PARA CONTROLAR A ÚLTIMA PÁGINA
    const [users, setUsers] = useState<UserCrudDTO[]>([]);

    // ESTADO PARA CONTROLAR A PÁGINA ATUAL
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
    });

    useEffect(() => {
        // BUSCAR OS UTILIZADORES COM BASE NA PÁGINA ATUAL
        userService.findAllUsers(queryParams.page)
            .then(response => {
                const nextPage = response.data.content;
                setUsers(prevUsers => queryParams.page === 0 ? nextPage : [...prevUsers, ...nextPage]);
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewUserClick() {
        navigate("/admin/users/create");
    }

    // FUNÇÃO PARA CARREGAR A PRÓXIMA PÁGINA
    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    return (
        <main>
            <section id="user-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Utilizadores</h2>
                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewUserClick}>
                        <ButtonInverse text="Novo Utilizador" />
                    </div>
                </div>
                <table className="dsc-table dsc-mb20 dsc-mt20">
                    {/* ... (código da tabela existente) ... */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th className="dsc-txt-left">Email</th>
                            <th>Papéis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className="dsc-txt-left">{user.name}</td>
                                <td className="dsc-txt-left">{user.email}</td>
                                <td>
                                    {user.roles.map(role => role.authority).join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* ADICIONAR O BOTÃO "CARREGAR MAIS" */}
                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>
        </main>
    );
}