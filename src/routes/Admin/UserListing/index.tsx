import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCrudDTO } from '../../../models/user-crud';
import * as userService from '../../../services/user-service';
import ButtonInverse from '../../../components/ButtonInverse';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogConfirmation from '../../../components/DialogConfirmation';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';

type QueryParams = {
    page: number;
    reload: boolean; 
}

export default function UserListing() {
    const navigate = useNavigate();

    const [isLastPage, setIsLastPage] = useState(false);
    const [users, setUsers] = useState<UserCrudDTO[]>([]);
    
    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        message: "Tem a certeza que deseja eliminar este utilizador?"
    });

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        reload: false
    });

    useEffect(() => {
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

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

    function handleUpdateClick(userId: number) {
        navigate(`/admin/users/${userId}`);
    }

    function handleDeleteClick(userId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, visible: true, id: userId });
    }

    function handleDialogConfirmationAnswer(answer: boolean, userId: number) {
        if (answer) {
            userService.deleteById(userId)
                .then(() => {
                    setQueryParams({ page: 0, reload: !queryParams.reload });
                })
                .catch(error => {
                    console.error("Erro ao eliminar utilizador:", error);
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
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
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th className="dsc-txt-left">Email</th>
                            <th>Papéis</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className="dsc-txt-left">{user.name}</td>
                                <td className="dsc-txt-left">{user.email}</td>
                                <td>{user.roles.map(role => role.authority).join(', ')}</td>
                                <td>
                                    <img 
                                        onClick={() => handleUpdateClick(user.id)} 
                                        className="dsc-user-listing-btn" 
                                        src={editIcon} 
                                        alt="Editar" 
                                    />
                                </td>
                                <td>
                                    <img 
                                        onClick={() => handleDeleteClick(user.id)} 
                                        className="dsc-user-listing-btn" 
                                        src={deleteIcon} 
                                        alt="Eliminar" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmationAnswer}
                />
            }
        </main>
    );
}