import './styles.css';
import { ItemLostDTO } from '../../models/itemlosts';

type Props = {
    itemlost: ItemLostDTO;
}

export default function ItemLostDetailsCard({ itemlost }: Props) {

    return (
        <div className="dsc-card dsc-mb20">
            <div className="dsc-product-details-top dsc-line-bottom">
                <img src={itemlost.imgUrl} alt={itemlost.description} />
            </div>
            <div className="dsc-product-details-bottom">
                <h3>{itemlost.description}</h3>
                <h4>Encontrado em: {itemlost.location}</h4>
                <p>Por: {itemlost.whoFind} na data {new Date(itemlost.foundDate).toLocaleDateString()}</p>
                {/* A secção de categorias foi removida daqui, corrigindo o erro */}
            </div>
        </div>
    );
}