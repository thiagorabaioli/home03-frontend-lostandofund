import './styles.css';
import { useEffect, useState } from 'react';
import { DeliveredItemDetailsDTO } from '../../../models/delivered-item-details';
import * as itemlostService from '../../../services/itemlost-service';

export default function DeliveredItemsListing() {

    const [deliveredItems, setDeliveredItems] = useState<DeliveredItemDetailsDTO[]>([]);

    useEffect(() => {
        itemlostService.findDeliveredItemsRequest()
            .then(response => {
                setDeliveredItems(response.data);
            });
    }, []);

    return (
        <main>
            <section id="delivered-items-section" className="tfr-container">
                <h2 className="tfr-section-title tfr-mb20">Itens Entregues</h2>

                <table className="tfr-table tfr-mb20 tfr-mt20">
                    <thead>
                       
                        <tr>
                            <th>Item (ID)</th>
                            <th className="tfr-txt-left">Descrição</th>
                            <th className="tfr-tb768">Entregue a</th>
                            <th className="tfr-tb768">Email</th>
                            <th className="tfr-tb768">Contacto</th>
                            <th className="tfr-tb768">Morada</th>
                            <th className="tfr-tb768">Data</th>
                            <th className="tfr-tb768">Cond. Aceite</th>
                            <th className="tfr-tb768">Mesma Cond.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredItems.map(item => (
                            <tr key={item.itemId}>
    
                                <td>{item.itemId}</td>
                                <td className="tfr-txt-left">{item.description}</td>
                                <td className="tfr-tb768">{item.deliveredToName}</td>
                                <td className="tfr-tb768">{item.deliveredToEmail}</td>
                                <td className="tfr-tb768">{item.deliveredToContact}</td>
                                <td className="tfr-tb768">{item.deliveredToLocation}</td>
                                <td className="tfr-tb768">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                                <td className="tfr-tb768">{item.conditionAccepted ? 'Sim' : 'Não'}</td>
                                <td className="tfr-tb768">{item.sameCondition ? 'Sim' : 'Não'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}