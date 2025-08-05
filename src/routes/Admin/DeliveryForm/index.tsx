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

    useEffect(() => {
        // Busca o item para mostrar a descrição
        itemlostService.findById(Number(params.itemlostId))
            .then(response => {
                setItem(response.data);
            });
    }, []);

    // Estado para controlar o formulário do dono (OwnerDTO)
    const [formData, setFormData] = useState<any>({
        name: { value: "", name: "name", placeholder: "Nome de quem recebe" },
        email: { value: "", name: "email", placeholder: "Email de quem recebe" },
        contact: { value: "", name: "contact", placeholder: "Contacto" },
        location: { value: "", name: "location", placeholder: "Morada" }
    });

    function handleSubmit(event: any) {
        event.preventDefault();
        
        // Valida e envia os dados para o serviço
        const requestBody = forms.toValues(formData);
        itemlostService.deliverRequest(Number(params.itemlostId), requestBody)
            .then(() => {
                // Se for sucesso, volta para a listagem
                navigate("/admin/itemlosts");
            });
    }

    // ... outras funções do formulário ...

    return (
        <main>
            <section id="deliver-form-section" className="dsc-container">
                <div className="dsc-deliver-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Entrega do item: {item?.description}</h2>
                        {/* ... campos do formulário ... */}
                        <div className="dsc-deliver-form-buttons">
                            <Link to="/admin/itemlosts">
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