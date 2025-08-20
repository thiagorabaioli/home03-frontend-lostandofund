import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as itemlostService from '../../../services/itemlost-service';
import { ItemLostDTO } from '../../../models/itemlosts';

// Estilo para a checkbox e o seu texto
const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    marginTop: '10px'
};

const checkboxLabelStyle = {
    marginLeft: '10px',
    fontSize: '12px',
    color: 'var(--tfr-color-font-primary)'
};

const checkboxErrorStyle = {
    color: 'var(--tfr-color-error)',
    fontSize: '12px',
    paddingLeft: '4px',
};


export default function DeliverForm() {

    const params = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<ItemLostDTO>();
    
    // 1. Adicionar o estado de carregamento
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<any>({
        name: {
            value: "", id: "name", name: "name", type: "text", placeholder: "Nome de quem recebe",
            validation: (value: string) => value.length >= 3,
            message: "O nome deve ter pelo menos 3 caracteres"
        },
        email: {
            value: "", id: "email", name: "email", type: "email", placeholder: "Email de quem recebe (opcional)",
            validation: (value: string) => value === "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Email inválido"
        },
        contact: {
            value: "", id: "contact", name: "contact", type: "text", placeholder: "Contacto",
        },
        location: {
            value: "", id: "location", name: "location", type: "text", placeholder: "Morada",
            validation: (value: string) => value.length >= 3,
            message: "A morada deve ter pelo menos 3 caracteres"
        },
        conditionAccepted: {
            value: false, id: "conditionAccepted", name: "conditionAccepted", type: "checkbox",
            validation: (value: boolean) => value === true,
            message: "É necessário aceitar as condições"
        }
    });

    useEffect(() => {
        itemlostService.findById(Number(params.itemlostId))
            .then(response => {
                setItem(response.data);
            });
    }, [params.itemlostId]);

    function handleInputChange(event: any) {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(forms.updateAndValidate(formData, name, newValue));
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

        // 2. Ativar o carregamento antes do pedido
        setIsLoading(true); 

        const requestBody = forms.toValues(formData);
        itemlostService.deliverRequest(Number(params.itemlostId), requestBody)
            .then(() => {
                navigate("/client");
            })
            .catch(() => {
                navigate("/client");
            })
            .finally(() => {
                // 3. Desativar o carregamento no final do pedido
                setIsLoading(false); 
            });
    }

    return (
        <main>
            <section id="deliver-form-section" className="tfr-container">
                <div className="tfr-deliver-form-container">
                    <form className="tfr-card tfr-form" onSubmit={handleSubmit}>
                        <h2>Entrega do item: {item?.description}</h2>
                        <div className="tfr-form-controls-container">
                         
                            <div>
                                <FormInput
                                    {...formData.name} className="tfr-form-control"
                                    onChange={handleInputChange} onTurnDirty={handleTurnDirty}
                                />
                                <div className="tfr-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.email} className="tfr-form-control"
                                    onChange={handleInputChange} onTurnDirty={handleTurnDirty}
                                />
                                <div className="tfr-form-error">{formData.email.message}</div>
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.contact} className="tfr-form-control"
                                    onChange={handleInputChange} onTurnDirty={handleTurnDirty}
                                />
                            </div>
                            <div>
                                <FormInput 
                                    {...formData.location} className="tfr-form-control"
                                    onChange={handleInputChange} onTurnDirty={handleTurnDirty}
                                />
                                <div className="tfr-form-error">{formData.location.message}</div>
                            </div>
                            <div style={checkboxStyle}>
                                <FormInput
                                    {...formData.conditionAccepted}
                                    onChange={handleInputChange}
                                    onTurnDirty={handleTurnDirty}
                                />
                                <label htmlFor="conditionAccepted" style={checkboxLabelStyle}>
                                    Confirmo que estou a receber o item nas mesmas condições (ou em condições aceitáveis) em que o perdi.
                                </label>
                            </div>
                             {formData.conditionAccepted.dirty === 'true' && formData.conditionAccepted.invalid === 'true' && (
                                <div style={checkboxErrorStyle}>{formData.conditionAccepted.message}</div>
                            )}

                        </div>
                        <div className="tfr-deliver-form-buttons">
                            <Link to="/client">
                                <button type="reset" className="tfr-btn tfr-btn-white">Cancelar</button>
                            </Link>
                            
                            <button type="submit" className="tfr-btn tfr-btn-blue" disabled={isLoading}>
                                {isLoading ? "A confirmar..." : "Confirmar Entrega"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}