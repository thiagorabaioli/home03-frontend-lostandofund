import './styles.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as userService from '../../../services/user-service';

export default function UserForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<any>({
        name: { value: "", id: "name", name: "name", type: "text", placeholder: "Nome" },
        email: { value: "", id: "email", name: "email", type: "email", placeholder: "Email" },
        password: { value: "", id: "password", name: "password", type: "password", placeholder: "Senha" },
        birthDate: { value: "", id: "birthDate", name: "birthDate", type: "date", placeholder: "Data de Nascimento" },
        porNumber: { value: "", id: "porNumber", name: "porNumber", type: "text", placeholder: "POR Colaborador" },
        role: { value: "ROLE_VIGILANTE", id: "role", name: "role" }
    });

    function handleInputChange(event: any) {
        setFormData(forms.update(formData, event.target.name, event.target.value));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const requestBody = forms.toValues(formData);
        const userRole = { authority: requestBody.role };
        delete requestBody.role;
        requestBody.roles = [userRole];

        userService.insertUser(requestBody)
            .then(() => {
                navigate("/admin/users");
            });
    }

    return (
        <main>
            <section id="user-form-section" className="dsc-container">
                <div className="dsc-user-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do Utilizador</h2>
                        <div className="dsc-form-controls-container">
                            <FormInput {...formData.name} className="dsc-form-control" onChange={handleInputChange} />
                            <FormInput {...formData.email} className="dsc-form-control" onChange={handleInputChange} />
                            <FormInput {...formData.password} className="dsc-form-control" onChange={handleInputChange} />
                            <FormInput {...formData.birthDate} className="dsc-form-control" onChange={handleInputChange} />
                            <FormInput {...formData.porNumber} className="dsc-form-control" onChange={handleInputChange} />
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