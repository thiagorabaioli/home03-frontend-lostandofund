import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as itemlostService from '../../../services/itemlost-service';

export default function ItemLostForm() {

    const params = useParams();
    const navigate = useNavigate();

    const isEditing = params.itemlostId !== 'create';

    const [formData, setFormData] = useState<any>({
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição do item",
            validation: (value: string) => value.length >= 3,
            message: "A descrição deve ter pelo menos 3 caracteres"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "URL da imagem",
        },
        location: {
            value: "",
            id: "location",
            name: "location",
            type: "text",
            placeholder: "Local onde foi encontrado",
        },
        whoFind: {
            value: "",
            id: "whoFind",
            name: "whoFind",
            type: "text",
            placeholder: "Quem encontrou",
        },
        foundDate: {
            value: "",
            id: "foundDate",
            name: "foundDate",
            type: "date",
            placeholder: "Data em que foi encontrado",
            validation: function (value: string) {
                return value !== ""; // Garante que o campo não está vazio
            },
            message: "O campo data é obrigatório"
        }
    });

    useEffect(() => {
        if (isEditing) {
            itemlostService.findById(Number(params.itemlostId))
                .then(response => {
                    const itemData = response.data;
                    if (itemData.foundDate) {
                        itemData.foundDate = itemData.foundDate.substring(0, 10);
                    }
                    const newFormData = forms.updateAll(formData, itemData);
                    setFormData(newFormData);
                });
        }
    }, [params.itemlostId]);

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

        if (!isEditing) {
            requestBody.status = true;
        }

        if (isEditing) {
            requestBody.id = params.itemlostId;
        }

        const request = isEditing
            ? itemlostService.updateRequest(requestBody)
            : itemlostService.insertRequest(requestBody);

        request
            .then(() => {
                navigate("/admin/itemlosts");
            })
            .catch(error => {
                const newInputs = forms.setBackendErrors(formData, error.response.data.errors);
                setFormData(newInputs);
            });
    }

    return (
        <main>
            <section id="itemlost-form-section" className="dsc-container">
                <div className="dsc-itemlost-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do Item Perdido</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.description}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.description.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.location}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.whoFind}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.foundDate}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.foundDate.message}</div>
                            </div>
                        </div>

                        <div className="dsc-itemlost-form-buttons">
                            <Link to="/admin/itemlosts">
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