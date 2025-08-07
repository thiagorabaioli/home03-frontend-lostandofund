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
            <section id="delivered-items-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Itens Entregues</h2>

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th>Item (ID)</th>
                            <th className="dsc-txt-left">Descrição</th>
                            <th className="dsc-tb768">Entregue a</th>
                            <th className="dsc-tb768">Data da Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredItems.map(item => (
                            <tr key={item.itemId}>
                                <td>{item.itemId}</td>
                                <td className="dsc-txt-left">{item.description}</td>
                                <td className="dsc-tb768">{item.deliveredToName}</td>
                                <td className="dsc-tb768">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}