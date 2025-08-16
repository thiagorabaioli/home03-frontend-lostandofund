import './styles.css';
import { useEffect, useState } from 'react';
import { DeliveredItemDetailsDTO } from '../../../models/delivered-item-details';
import * as itemlostService from '../../../services/itemlost-service';
import ButtonPrimary from '../../../components/ButtonPrimary';

// --- NOVO Componente para o Modal de Detalhes ---
type DetailsModalProps = {
    item: DeliveredItemDetailsDTO;
    onClose: () => void;
};

// Função auxiliar para traduzir o tipo de interação
function getInteractionTypeText(typeCode: number) {
    switch (typeCode) {
        case 1: return 'REGISTO INICIAL';
        case 2: return 'ENTREGA';
        case 3: return 'EM ESPERA';
        case 4: return 'OUTRO';
        default: return 'DESCONHECIDO';
    }
}

function DetailsModal({ item, onClose }: DetailsModalProps) {
    return (
        <div className="dsc-dialog-background" onClick={onClose}>
            <div className="dsc-dialog-box" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
                <h2>Detalhes do Item ID: {item.itemId}</h2>
                <div className="dsc-delivered-item-details-container">
                    <p><strong>Descrição:</strong> {item.description}</p>
                    <p><strong>Data de Achado:</strong> {new Date(item.foundDate).toLocaleDateString()}</p>
                    <hr />
                    <h3>Histórico de Interações</h3>
                    <table className="dsc-table dsc-mt20">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Utilizador</th>
                                <th className="dsc-txt-left">Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.interactions.map(interaction => (
                                <tr key={interaction.id}>
                                    <td>{getInteractionTypeText(interaction.type)}</td>
                                    <td>{new Date(interaction.interactionDate).toLocaleString()}</td>
                                    <td>{interaction.user.name}</td>
                                    <td className="dsc-txt-left">{interaction.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dsc-dialog-btn" onClick={onClose}>
                    <ButtonPrimary text="Fechar" />
                </div>
            </div>
        </div>
    );
}
// --- Fim do Componente do Modal ---

export default function DeliveredItemsListing() {

    const [deliveredItems, setDeliveredItems] = useState<DeliveredItemDetailsDTO[]>([]);
    
    // Novo estado para controlar o modal de detalhes
    const [detailsModal, setDetailsModal] = useState<{ visible: boolean; item: DeliveredItemDetailsDTO | null }>({
        visible: false,
        item: null,
    });

    useEffect(() => {
        itemlostService.findDeliveredItemsRequest()
            .then(response => {
                setDeliveredItems(response.data);
            });
    }, []);

    // Função para abrir o modal com o item selecionado
    const handleDetailsClick = (item: DeliveredItemDetailsDTO) => {
        setDetailsModal({ visible: true, item: item });
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setDetailsModal({ visible: false, item: null });
    };

    return (
        <main>
            <section id="delivered-items-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Itens Entregues</h2>

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th>Item (ID)</th>
                            <th className="dsc-txt-left">Descrição</th>
                            <th className="dsc-tb768">Entregue a</th>
                            <th className="dsc-tb768">Data da Entrega</th>
                            <th>Detalhes</th> {/* Coluna adicionada */}
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredItems.map(item => (
                            <tr key={item.itemId}>
                                <td>{item.itemId}</td>
                                <td className="dsc-txt-left">{item.description}</td>
                                <td className="dsc-tb768">{item.deliveredToName}</td>
                                <td className="dsc-tb768">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                                <td>
                                    {/* Botão para abrir o modal de detalhes */}
                                    <button className="dsc-btn-table" onClick={() => handleDetailsClick(item)}>
                                        Ver Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Renderização condicional do modal */}
            {detailsModal.visible && detailsModal.item && (
                <DetailsModal 
                    item={detailsModal.item} 
                    onClose={handleCloseModal} 
                />
            )}
        </main>
    );
}