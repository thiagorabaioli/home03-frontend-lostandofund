import './styles.css';
import { useEffect, useState } from 'react';
import { ItemLostMinDTO } from '../../../models/itemlost-min';
import * as itemlostService from '../../../services/itemlost-service';

export default function PublicCatalog() {

    const [items, setItems] = useState<ItemLostMinDTO[]>([]);

    useEffect(() => {
        itemlostService.findPublicItems()
            .then(response => {
                setItems(response.data);
            });
    }, []);

    return (
        <main>
            <section id="public-catalog-section" className="tfr-container">
                <h2 className="tfr-section-title tfr-mb20">Itens Perdidos Recentemente</h2>

                <div className="tfr-public-list-container">
                    {items.length === 0 ? (
                        <p>Nenhum item perdido encontrado de momento.</p>
                    ) : (
                        items.map((item, index) => (
                            <div key={index} className="tfr-public-list-item">
                                <p className="tfr-public-item-desc">{item.description}</p>
                                <p className="tfr-public-item-date">
                                    Encontrado em: {new Date(item.foundDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}