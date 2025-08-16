import './styles.css';
import * as itemLostService from '../../../services/itemlost-service';
import editIcon from '../../../assets/edit.svg';
import { useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';

// --- Componente para o Modal de Entrega em Lote ---
// (Adicionado aqui para simplicidade)
type BatchModalProps = {
    onClose: () => void;
    onSubmit: (centerName: string) => void;
};

function BatchDeliverModal({ onClose, onSubmit }: BatchModalProps) {
    const [centerName, setCenterName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (centerName.trim().length < 3) {
            alert("O nome do centro deve ter pelo menos 3 caracteres.");
            return;
        }
        setIsSubmitting(true);
        await onSubmit(centerName);
        setIsSubmitting(false);
    };

    return (
        <div className="dsc-dialog-background" onClick={onClose}>
            <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>Entregar Itens em Lote</h2>
                    <div className="dsc-form-controls-container dsc-mt20 dsc-mb20">
                        <input
                            className="dsc-form-control"
                            type="text"
                            value={centerName}
                            onChange={(e) => setCenterName(e.target.value)}
                            placeholder="Nome do Centro de Recolha (PSP, GNR, etc.)"
                        />
                    </div>
                    <div className="dsc-dialog-btn-container">
                        <button type="button" onClick={onClose} className="dsc-btn dsc-btn-white">
                            Cancelar
                        </button>
                        <button type="submit" className="dsc-btn dsc-btn-blue" disabled={isSubmitting}>
                            {isSubmitting ? "A Entregar..." : "Confirmar Entrega"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
// --- Fim do Componente do Modal ---


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

    // State para controlar os IDs dos itens selecionados
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    // State para controlar a visibilidade do modal de entrega em lote
    const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);

    useEffect(() => {
        itemLostService.findPageRequest(queryParams.page, queryParams.name, 12, "id,desc")
            .then(response => {
                const nextPage = response.data.content;
                setItemLost(queryParams.page === 0 ? nextPage : [...itemlost, ...nextPage]);
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    // Função para recarregar os dados do zero
    const reloadItems = () => {
        setQueryParam({ ...queryParams, page: 0 });
    };

    function handleNewProductClick() {
        navigate("/client/itemlosts/create");
    }

    function handleSearch(searchText: string) {
        setItemLost([]);
        setQueryParam({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParam({ ...queryParams, page: queryParams.page + 1 });
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleUpdateClick(itemlostId: number) {
        navigate(`/client/itemlosts/${itemlostId}`);
    }

    function handleDeliverClick(itemlostId: number) {
        navigate(`/client/itemlosts/${itemlostId}/deliver`);
    }

    // Função para adicionar ou remover um ID da lista de selecionados
    const handleSelectItem = (itemId: number) => {
        if (selectedIds.includes(itemId)) {
            setSelectedIds(selectedIds.filter(id => id !== itemId));
        } else {
            setSelectedIds([...selectedIds, itemId]);
        }
    };

    // Função para submeter a entrega em lote
    const handleBatchSubmit = (centerName: string) => {
        itemLostService.deliverItemsInBatchRequest(centerName, selectedIds)
            .then(() => {
                setIsBatchModalVisible(false); // Fecha o modal
                setSelectedIds([]); // Limpa a seleção
                reloadItems(); // Recarrega a lista de itens
                setDialogInfoData({ visible: true, message: "Itens entregues com sucesso!" });
            })
            .catch(error => {
                console.error("Erro na entrega em lote:", error);
                setDialogInfoData({ visible: true, message: "Erro ao entregar os itens." });
            });
    };

    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Itens Perdidos</h2>

               <div className="dsc-btn-page-container dsc-mb20" style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '460px' }}>
                <div onClick={handleNewProductClick}>
                    <ButtonInverse text="Novo Item" />
                </div>
                
               
                {selectedIds.length > 0 && (
                    <div onClick={() => setIsBatchModalVisible(true)}>
                        <button className="dsc-btn dsc-btn-blue">Entregar em Lote ({selectedIds.length})</button>
                    </div>
                     )}
</div>

                <SearchBar onSearch={handleSearch} />

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th>Sel.</th>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-txt-left">Descrição</th>
                            <th className="dsc-tb768">Data</th>
                            <th className="dsc-tb768">Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemlost.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.status && (
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => handleSelectItem(item.id)}
                                            />
                                        )}
                                    </td>
                                    <td className="dsc-tb576">{item.id}</td>
                                    <td><img className="dsc-product-listing-image" src={item.imgUrl} alt={item.description} /></td>
                                    <td className="dsc-txt-left">{item.description}</td>
                                    <td className="dsc-tb768">{new Date(item.foundDate).toLocaleDateString()}</td>
                                    <td className="dsc-tb768">{item.status ? "Perdido" : "Entregue"}</td>
                                    <td>
                                        {item.status && <div onClick={() => handleDeliverClick(item.id)} className="dsc-product-listing-btn">Entregar</div>}
                                    </td>
                                    <td><img onClick={() => handleUpdateClick(item.id)} className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>
            
            {dialogInfoData.visible && (
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose}
                />
            )}

            {isBatchModalVisible && (
                <BatchDeliverModal
                    onClose={() => setIsBatchModalVisible(false)}
                    onSubmit={handleBatchSubmit}
                />
            )}
        </main>
    );
}