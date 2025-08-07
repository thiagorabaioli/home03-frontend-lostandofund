
import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as itemlostService from '../../../services/itemlost-service';
import { ItemLostDTO } from '../../../models/itemlosts';

export default function DeliverForm() {

    const params = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<ItemLostDTO>();

    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome de quem recebe",
            validation: (value: string) => value.length >= 3,
            message: "O nome deve ter pelo menos 3 caracteres"
        },
        email: {
            value: "",
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Email de quem recebe",
            validation: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Email inválido"
        },
        contact: {
            value: "",
            id: "contact",
            name: "contact",
            type: "text",
            placeholder: "Contacto",
        },
        location: {
            value: "",
            id: "location",
            name: "location",
            type: "text",
            placeholder: "Morada",
        }
    });

    useEffect(() => {
        itemlostService.findById(Number(params.itemlostId))
            .then(response => {
                setItem(response.data);
            });
    }, [params.itemlostId]);

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    // ADICIONE ESTA FUNÇÃO
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
        itemlostService.deliverRequest(Number(params.itemlostId), requestBody)
            .then(() => {
              
                navigate("/client");
            })
            .catch(() => {
              
                navigate("/client");
            });
    }

    return (
        <main>
            <section id="deliver-form-section" className="dsc-container">
                <div className="dsc-deliver-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Entrega do item: {item?.description}</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    className="dsc-form-control"
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty} // ADICIONE ESTA LINHA
                                />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.email}
                                    className="dsc-form-control"
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty} // ADICIONE ESTA LINHA
                                />
                                <div className="dsc-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.contact} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange} 
                                    onTurnDirty={handleTurnDirty} // ADICIONE ESTA LINHA
                                />
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.location} 
                                    className="dsc-form-control" 
                                    onChange={handleInputChange} 
                                    onTurnDirty={handleTurnDirty} // ADICIONE ESTA LINHA
                                />
                            </div>
                        </div>

                         <div className="dsc-deliver-form-buttons">
                                <Link to="/client">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                                </Link>
                                <button type="submit" className="dsc-btn dsc-btn-blue">Confirmar Entrega</button>
                         </div>
                        </form>
                </div>
            </section>
        </main>
    );
}