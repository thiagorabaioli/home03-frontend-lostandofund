import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as userService from '../../../services/user-service';

export default function UserForm() {
    const navigate = useNavigate();
    const params = useParams();
    const isEditing = params.userId !== 'create';

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
            value: "", id: "password", name: "password", type: "password", placeholder: "Senha (deixe em branco para não alterar)",
            validation: (value: string) => isEditing || value.length >= 6,
            message: "A senha deve ter pelo menos 6 caracteres"
        },
        birthDate: { value: "", id: "birthDate", name: "birthDate", type: "date", placeholder: "Data de Nascimento" },
        porNumber: { value: "", id: "porNumber", name: "porNumber", type: "text", placeholder: "Nº Cartão de Cidadão/Passaporte" },
        role: { value: "ROLE_VIGILANTE", id: "role", name: "role" }
    });

    useEffect(() => {
        if (isEditing) {
            userService.findById(Number(params.userId))
                .then(response => {
                    const userData = response.data;
                    if (userData.birthDate) {
                        userData.birthDate = userData.birthDate.substring(0, 10);
                    }
                    userData.role = userData.roles[0]?.authority || "ROLE_VIGILANTE";
                    const newFormData = forms.updateAll(formData, userData);
                    setFormData(newFormData);
                });
        }
    }, [params.userId]);

    function handleInputChange(event: any) {
        // Agora também valida a cada mudança
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    // ADICIONAR ESTA FUNÇÃO
    function handleTurnDirty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        // VALIDA TODOS OS CAMPOS ANTES DE ENVIAR
        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return; // Impede o envio se houver erros
        }

        const requestBody = forms.toValues(formData);
        
        if (isEditing && !requestBody.password) {
            delete requestBody.password;
        }

        const userRole = { authority: requestBody.role };
        delete requestBody.role;
        requestBody.roles = [userRole];

        const request = isEditing
            ? userService.updateUser(Number(params.userId), requestBody)
            : userService.insertUser(requestBody);

        request
            .then(() => {
                navigate("/admin/users");
            })
            .catch(error => {
                const newInputs = forms.setBackendErrors(formData, error.response.data.errors);
                setFormData(newInputs);
            });
    }

    return (
        <main>
            <section id="user-form-section" className="dsc-container">
                <div className="dsc-user-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>{isEditing ? 'Editar Utilizador' : 'Novo Utilizador'}</h2>
                        <div className="dsc-form-controls-container">
                            {/* ADICIONAR onTurnDirty E A MENSAGEM DE ERRO A CADA FormInput */}
                            <div>
                                <FormInput 
                                    {...formData.name} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty} 
                                />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.email} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty}
                                />
                                <div className="dsc-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.password} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty}
                                />
                                <div className="dsc-form-error">{formData.password.message}</div>
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.birthDate} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty}
                                />
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.porNumber} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty}
                                />
                            </div>
                            <select {...formData.role} className="dsc-form-control" onChange={handleInputChange}>
                                <option value="ROLE_VIGILANTE">Vigilante</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="dsc-user-form-buttons">
                            <Link to="/admin/users">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}