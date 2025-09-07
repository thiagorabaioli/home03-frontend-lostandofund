import './styles.css';
import * as itemLostService from '../../../services/itemlost-service';
import { BatchDeliveryPayload } from '../../../services/itemlost-service';
import editIcon from '../../../assets/edit.svg';
import { useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../../../components/ButtonPrimary';

// --- Componente para o Modal de Entrega em Lote (ATUALIZADO) ---
type BatchModalProps = {
    onClose: () => void;
    onSubmit: (payload: BatchDeliveryPayload) => Promise<void>;
    selectedItems: ItemLostDTO[];
};

function BatchDeliverModal({ onClose, onSubmit, selectedItems }: BatchModalProps) {
    const [formData, setFormData] = useState({
        centerName: 'PSP',
        otherCenterName: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        termsAccepted: false,
        receiverName: '',
        receiverEmail: '',
        receiverAddress: '' // Novo campo de estado para a morada
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData({ ...formData, [name]: inputValue });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // Validações
        if (!formData.termsAccepted) {
            alert("É necessário confirmar o recebimento dos itens.");
            return;
        }
        const center = formData.centerName === 'OUTRO' ? formData.otherCenterName : formData.centerName;
        if (center.trim().length < 3) {
            alert("O nome do centro de recolha deve ter pelo menos 3 caracteres.");
            return;
        }
        if (formData.receiverName.trim().length < 3) {
            alert("O nome de quem recebe deve ter pelo menos 3 caracteres.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receiverEmail)) {
            alert("Por favor, insira um email válido para quem recebe.");
            return;
        }
        if (formData.receiverAddress.trim().length < 5) {
            alert("A morada de quem recebe deve ter pelo menos 5 caracteres.");
            return;
        }

        setIsSubmitting(true);
        await onSubmit({
            centerName: center,
            deliveryDate: formData.deliveryDate,
            termsAccepted: formData.termsAccepted,
            itemIds: selectedItems.map(item => item.id),
            receiverName: formData.receiverName,
            receiverEmail: formData.receiverEmail,
          
        });
        setIsSubmitting(false);
    };

    return (
        <div className="tfr-dialog-background" onClick={onClose}>
            <div className="tfr-dialog-box" style={{maxWidth: '600px'}} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>ENTREGA DE ITENS EM LOTE</h2>
                    <div className="tfr-form-controls-container tfr-mt20 tfr-mb20">
                        {/* --- Select do Centro de Recolha --- */}
                        <select name="centerName" value={formData.centerName} onChange={handleInputChange} className="tfr-form-control">
                            <option value="PSP">PSP</option>
                            <option value="GNR">GNR</option>
                            <option value="Centro Comercial">Centro Comercial</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                        {formData.centerName === 'OUTRO' && (
                            <input name="otherCenterName" value={formData.otherCenterName} onChange={handleInputChange} className="tfr-form-control" type="text" placeholder="Especifique o centro de recolha" />
                        )}

                        {/* --- Campos de quem recebe --- */}
                        <input name="receiverName" value={formData.receiverName} onChange={handleInputChange} className="tfr-form-control" type="text" placeholder="Nome de quem recebe" />
                        <input name="receiverEmail" value={formData.receiverEmail} onChange={handleInputChange} className="tfr-form-control" type="email" placeholder="Email de quem recebe" />
                        <input name="receiverAddress" value={formData.receiverAddress} onChange={handleInputChange} className="tfr-form-control" type="text" placeholder="Morada de quem recebe" />

                        {/* --- Data da entrega --- */}
                        <input name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} className="tfr-form-control" type="date" />
                        
                        {/* --- Lista de itens e confirmação --- */}
                        <div className="tfr-public-list-container" style={{maxHeight: '150px', overflowY: 'auto'}}>
                            <p>Itens a serem entregues:</p>
                            {selectedItems.map(item => (
                                <div key={item.id} className="tfr-public-list-item">
                                    <p className="tfr-public-item-desc">ID {item.id}: {item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} type="checkbox" id="terms" />
                            <label htmlFor="terms" style={{ marginLeft: '10px', fontSize: '12px' }}>
                                Confirmo o recebimento dos itens listados acima.
                            </label>
                        </div>
                    </div>
                    {/* --- Botões de ação --- */}
                    <div className="tfr-dialog-btn-container">
                        <button type="button" onClick={onClose} className="tfr-btn tfr-btn-white">Cancelar</button>
                        <button type="submit" className="tfr-btn tfr-btn-blue" disabled={isSubmitting}>
                            {isSubmitting ? "A Entregar..." : "Confirmar Entrega"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



type QueryParams = {
    page: number;
    name: string;
}

export default function ItemlostListing() {
    const navigate = useNavigate();
    const [dialogInfoData, setDialogInfoData] = useState({ visible: false, message: "Operação com sucesso!" });
    const [isLastPage, setIsLastPage] = useState(false);
    const [itemlost, setItemLost] = useState<ItemLostDTO[]>([]);
    const [queryParams, setQueryParam] = useState<QueryParams>({ page: 0, name: "" });
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);

    useEffect(() => {
        itemLostService.findPageRequest(queryParams.page, queryParams.name, 12, "id,desc")
            .then(response => {
                const nextPage = response.data.content;
                setItemLost(prevItems => queryParams.page === 0 ? nextPage : [...prevItems, ...nextPage]);
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    const reloadItems = () => {
        setItemLost([]);
        setQueryParam({ ...queryParams, page: 0 });
    };

    const handleNewProductClick = () => navigate("/client/itemlosts/create");
    const handleSearch = (searchText: string) => {
        setItemLost([]);
        setQueryParam({ ...queryParams, page: 0, name: searchText });
    };
    const handleNextPageClick = () => setQueryParam({ ...queryParams, page: queryParams.page + 1 });
    const handleDialogInfoClose = () => setDialogInfoData({ ...dialogInfoData, visible: false });
    const handleUpdateClick = (id: number) => navigate(`/client/itemlosts/${id}`);
    const handleDeliverClick = (id: number) => navigate(`/client/itemlosts/${id}/deliver`);

    const handleSelectItem = (itemId: number) => {
        setSelectedIds(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
    };

    const handleBatchSubmit = async (payload: BatchDeliveryPayload) => {
        try {
            await itemLostService.deliverItemsInBatchRequest(payload);
            setIsBatchModalVisible(false);
            setSelectedIds([]);
            reloadItems();
            setDialogInfoData({ visible: true, message: "Itens entregues com sucesso!" });
        } catch (error) {
            console.error("Erro na entrega em lote:", error);
            setDialogInfoData({ visible: true, message: "Erro ao entregar os itens." });
        }
    };
    
    const selectedItems = itemlost.filter(item => selectedIds.includes(item.id));

    return (
        <main>
            <section id="product-listing-section" className="tfr-container">
                <h2 className="tfr-section-title tfr-mb20">Itens Perdidos</h2>
                <div className="tfr-btn-page-container tfr-mb20" style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '460px' }}>
                    <div onClick={handleNewProductClick}><ButtonInverse text="Novo Item" /></div>
                    {selectedIds.length > 0 && (
                        <div onClick={() => setIsBatchModalVisible(true)}>
                            <button className="tfr-btn tfr-btn-blue">Entregar em Lote ({selectedIds.length})</button>
                        </div>
                    )}
                </div>
                <SearchBar onSearch={handleSearch} />
                <table className="tfr-table tfr-mb20 tfr-mt20">
                    <thead>
                        <tr>
                            <th>Sel.</th>
                            <th className="tfr-tb576">ID</th>
                            <th></th>
                            <th className="tfr-txt-left">Descrição</th>
                            <th className="tfr-tb768">Data</th>
                            <th className="tfr-tb768">Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemlost.map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.status && <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} />}
                                </td>
                                <td className="tfr-tb576">{item.id}</td>
                                <td><img className="tfr-product-listing-image" src={item.imgUrl} alt={item.description} /></td>
                                <td className="tfr-txt-left">{item.description}</td>
                                <td className="tfr-tb768">{new Date(item.foundDate).toLocaleDateString()}</td>
                                <td className="tfr-tb768">{item.status ? "Perdido" : "Entregue"}</td>
                                <td>{item.status && <div onClick={() => handleDeliverClick(item.id)} className="tfr-product-listing-btn">Entregar</div>}</td>
                                <td><img onClick={() => handleUpdateClick(item.id)} className="tfr-product-listing-btn" src={editIcon} alt="Editar" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isLastPage && <ButtonNextPage onNextPage={handleNextPageClick} />}
            </section>
            
            {dialogInfoData.visible && <DialogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose} />}
            {isBatchModalVisible && <BatchDeliverModal onClose={() => setIsBatchModalVisible(false)} onSubmit={handleBatchSubmit} selectedItems={selectedItems} />}
        </main>
    );
}