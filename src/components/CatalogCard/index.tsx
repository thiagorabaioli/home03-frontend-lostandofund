import './styles.css';
import { ItemLostDTO } from '../../models/itemlosts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import * as authService from '../../services/auth-service';

type Props = {
    itemlost: ItemLostDTO;
}

export default function CatalogCard({ itemlost }: Props) {

    const { contextTokenPayload } = useContext(ContextToken);

    const destination = (contextTokenPayload && authService.hasAnyRoles(['ROLE_ADMIN', 'ROLE_VIGILANTE']))
        ? `/client/itemlost-details/${itemlost.id}`
        : '#';
    
    
    const currentYear = new Date().getFullYear();

    return (
        <Link to={destination}>
            <div className="dsc-card">
                <div className="dsc-catalog-card-top dsc-line-bottom">
                   
                    <div className="dsc-catalog-card-id">
                      ID:  {itemlost.id}/{currentYear}
                    </div>
                    <img src={itemlost.imgUrl} alt={itemlost.description} />
                </div>
                <div className="dsc-catalog-card-bottom">
                    <h3>{itemlost.description}</h3>
                    <h4>
                        Encontrado em: {itemlost.location}
                    </h4>
                    <h4>
                        Data: {new Date(itemlost.foundDate).toLocaleDateString()}
                    </h4>
                </div>
            </div>
        </Link>
    );
}