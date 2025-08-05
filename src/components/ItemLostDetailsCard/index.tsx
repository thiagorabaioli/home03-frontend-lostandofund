import './styles.css';
import ProductCategory from '../ProductCategory';
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
                <h4>{itemlost.description}</h4>
                <p>{itemlost.foundDate}</p>
                <div className="dsc-category-container">
                    {
                        
                    }
                </div>
            </div>
        </div>
    );
}
