import './styles.css';
import { ItemLostDTO } from '../../models/itemlosts';
import { Link } from 'react-router-dom';

type Props = {
    itemlost: ItemLostDTO; // Alterado
}

export default function CatalogCard({ itemlost }: Props) { // Alterado

    return (
        <Link to={`/itemlost-details/${itemlost.id}`}> {/* Alterado */}
            <div className="dsc-card">
                <div className="dsc-catalog-card-top dsc-line-bottom">
                    <img src={itemlost.imgUrl} alt={itemlost.description} /> {/* Alterado */}
                </div>
                <div className="dsc-catalog-card-bottom">
                    <h3>{itemlost.description}</h3> {/* Alterado */}
                    <h4>
                        Encontrado em: {itemlost.location} {/* Alterado */}
                    </h4>
                </div>
            </div>
        </Link>
    );
}