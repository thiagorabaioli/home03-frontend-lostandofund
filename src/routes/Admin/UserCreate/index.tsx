import './styles.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as userService from '../../../services/user-service';
import DialogInfo from '../../../components/DialogInfo';

export default function UserCreate() {
    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Erro ao salvar utilizador."
    });

    const [formData, setFormData] = useState<any>({
        name: { 
            value: "", id: "name", name: "name", type: "text", placeholder: "Nome",
            validation: (value: string) => value.length >= 3,
            message: "O nome deve ter pelo menos 3 caracteres"
        },
        email: { 
            value: "", id: "email", name: "email", type: "email", placeholder: "Email",
            validation: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Email inválido"
        },
        password: { 
            value: "", id: "password", name: "password", type: "password", placeholder: "Senha",
            validation: (value: string) => value.length >= 6,
            message: "A senha deve ter pelo menos 6 caracteres"
        },
        birthDate: { value: "", id: "birthDate", name: "birthDate", type: "date", placeholder: "Data de Nascimento" },
        porNumber: { value: "", id: "porNumber", name: "porNumber", type: "text", placeholder: "POR Colaborador" },
        role: { value: "ROLE_VIGILANTE", id: "role", name: "role" }
    });

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleTurnDirty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        const requestBody = forms.toValues(formData);
        const userRole = { authority: requestBody.role };
        delete requestBody.role;
        requestBody.roles = [userRole];

        userService.insertUser(requestBody)
            .then(() => {
                navigate("/admin/users");
            })
            .catch(error => {
                if (error.response?.data?.errors) {
                    const newInputs = forms.setBackendErrors(formData, error.response.data.errors);
                    setFormData(newInputs);
                } else {
                    setDialogInfoData({ visible: true, message: error.response?.data?.error || "Erro ao salvar utilizador." });
                }
            });
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    return (
        <main>
            <section id="user-create-section" className="dsc-container">
                <div className="dsc-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Novo Utilizador</h2>
                       
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput {...formData.name} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.email} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="dsc-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.password} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                                <div className="dsc-form-error">{formData.password.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.birthDate} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                            </div>
                            <div>
                                <FormInput {...formData.porNumber} className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                            </div>
                            <select {...formData.role} className="dsc-form-control" onChange={handleInputChange}>
                                <option value="ROLE_VIGILANTE">Vigilante</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="dsc-form-buttons">
                            <Link to="/admin/users">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
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