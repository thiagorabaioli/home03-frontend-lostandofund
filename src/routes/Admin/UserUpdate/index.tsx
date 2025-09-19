import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as userService from '../../../services/user-service';
import DialogInfo from '../../../components/DialogInfo';

export default function UserUpdate() {
    const navigate = useNavigate();
    const params = useParams();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Erro ao atualizar utilizador."
    });

    const [formData, setFormData] = useState<any>({
        name: { value: "", id: "name", name: "name", type: "text" /* ...validações */ },
        email: { value: "", id: "email", name: "email", type: "email" /* ...validações */ },
        password: { value: "", id: "password", name: "password", type: "password" },
        birthDate: { value: "", id: "birthDate", name: "birthDate", type: "date" },
        porNumber: { value: "", id: "porNumber", name: "porNumber", type: "text" },
        role: { value: "ROLE_VIGILANTE", id: "role", name: "role" }
    });

    useEffect(() => {
        const userId = Number(params.userId);
        userService.findById(userId)
            .then(response => {
                const userData = response.data;
                if (userData.birthDate) {
                    userData.birthDate = userData.birthDate.substring(0, 10);
                }
                userData.role = userData.roles[0]?.authority || "ROLE_VIGILANTE";
                const newFormData = forms.updateAll(formData, userData);
                setFormData(newFormData);
            });
    }, [params.userId]);

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleTurnDirty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        
        const requestBody = forms.toValues(formData);
        if (!requestBody.password) {
            delete requestBody.password;
        }

        const userRole = { authority: requestBody.role };
        delete requestBody.role;
        requestBody.roles = [userRole];

        const userId = Number(params.userId);
        userService.updateUser(userId, requestBody)
            .then(() => {
                navigate("/admin/users");
            })
            .catch(error => {
                setDialogInfoData({ visible: true, message: error.response?.data?.error || "Erro ao atualizar utilizador." });
            });
    }
    
    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    return (
        <main>
            <section id="user-update-section" className="tfr-container">
                <div className="tfr-form-container">
                    <form className="tfr-card tfr-form" onSubmit={handleSubmit}>
                        <h2>Editar Utilizador</h2>
                       
                        <div className="tfr-form-controls-container">
                           <div>
                                <label className="tfr-form-label" htmlFor="name">Nome:</label>
                                <FormInput {...formData.name} className="tfr-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="tfr-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <label className="tfr-form-label" htmlFor="email">Email:</label>
                                <FormInput {...formData.email} className="tfr-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="tfr-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <label className="tfr-form-label" htmlFor="password">Senha (deixe em branco para não alterar):</label>
                                <FormInput {...formData.password} className="tfr-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                            </div>
                            <div>
                                <label className="tfr-form-label" htmlFor="birthDate">Data de Nascimento:</label>
                                <FormInput {...formData.birthDate} className="tfr-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                            </div>
                            <div>
                                <label className="tfr-form-label" htmlFor="porNumber">POR Colaborador:</label>
                                <FormInput {...formData.porNumber} className="tfr-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                            </div>
                            <label className="tfr-form-label" htmlFor="role">Perfil:</label>
                            <select {...formData.role} className="tfr-form-control" onChange={handleInputChange}>
                                <option value="ROLE_VIGILANTE">Vigilante</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="tfr-form-buttons">
                            <Link to="/admin/users">
                                <button type="reset" className="tfr-btn tfr-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="tfr-btn tfr-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
             {
                dialogInfoData.visible &&
                <DialogInfo 
                    message={dialogInfoData.message} 
                    onDialogClose={handleDialogInfoClose} 
                />
            }
        </main>
    );
}