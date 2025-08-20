import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as itemlostService from '../../../services/itemlost-service';
import axios from 'axios';

export default function ItemLostForm() {
    const params = useParams();
    const navigate = useNavigate();
    const isEditing = params.itemlostId !== 'create';

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<any>({
        description: { value: "", id: "description", name: "description", type: "text", placeholder: "Descrição do item", validation: (value: string) => value.length >= 3, message: "A descrição deve ter pelo menos 3 caracteres" },
        imgUrl: { value: "", id: "imgUrl", name: "imgUrl", type: "text", placeholder: "URL da imagem (será preenchido automaticamente)", },
        location: { value: "", id: "location", name: "location", type: "text", placeholder: "Local onde foi encontrado", },
        whoFind: { value: "", id: "whoFind", name: "whoFind", type: "text", placeholder: "Quem encontrou", },
        foundDate: { value: "", id: "foundDate", name: "foundDate", type: "date", placeholder: "Data em que foi encontrado", validation: (value: string) => value !== "", message: "O campo data é obrigatório" }
    });
    
    // ... (useEffect e outras funções continuam iguais)
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

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    }

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }
    
    function handleTurnDirty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        let imageUrl = formData.imgUrl.value; 
        if (selectedFile) {
            const imgbbFormData = new FormData();
            imgbbFormData.append('image', selectedFile);

            try {
                // CORREÇÃO: URL e lógica de upload para o ImgBB
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imgbbFormData);
                imageUrl = response.data.data.url; // Obtém o URL do ImgBB
            } catch (error) {
                console.error("Erro ao fazer upload para o ImgBB:", error);
                alert("Falha no upload da imagem. Tente novamente.");
                return;
            }
        }
        
        const requestBody = forms.toValues(formData);
        requestBody.imgUrl = imageUrl;

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
                navigate("/client/itemlosts"); // Alterado de /admin/itemlosts
            })
            .catch(error => {
                const newInputs = forms.setBackendErrors(formData, error.response.data.errors);
                setFormData(newInputs);
            });
    }

    return (
        <main>
            <section id="itemlost-form-section" className="tfr-container">
                <div className="tfr-itemlost-form-container">
                    <form className="tfr-card tfr-form" onSubmit={handleSubmit}>
                        <h2>Dados do Item Perdido</h2>
                        <div className="tfr-form-controls-container">
                            {/* ... (campos description, location, etc. continuam aqui) ... */}
                             <div>
                                <FormInput
                                    {...formData.description}
                                    className="tfr-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="tfr-form-error">{formData.description.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.location}
                                    className="tfr-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                             <div>
                                <FormInput
                                    {...formData.whoFind}
                                    className="tfr-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.foundDate}
                                    className="tfr-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="tfr-form-error">{formData.foundDate.message}</div>
                            </div>

                            <div>
                                <label htmlFor="file-upload" className="tfr-btn tfr-btn-white">
                                    Selecionar Imagem
                                </label>
                                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }}/>
                                {selectedFile && <p className="tfr-upload-feedback">Ficheiro selecionado: {selectedFile.name}</p>}
                            </div>

                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="tfr-form-control"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="tfr-itemlost-form-buttons">
                            <Link to="/admin/itemlosts">
                                <button type="reset" className="tfr-btn tfr-btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="tfr-btn tfr-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}