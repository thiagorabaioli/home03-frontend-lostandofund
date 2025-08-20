import './styles.css';
import ButtonInverse from "../../../components/ButtonInverse";
import ItemLostDetailsCard from "../../../components/ItemLostDetailsCard";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';
import * as itemlostService from '../../../services/itemlost-service';
import { ContextToken } from '../../../utils/context-token';
import * as authService from '../../../services/auth-service';

export default function ItemLostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [itemlost, setItemlost] = useState<ItemLostDTO>();

  const { contextTokenPayload } = useContext(ContextToken);

  useEffect(() => {
    itemlostService.findById(Number(params.itemlostId))
      .then(response => {
        setItemlost(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.itemlostId]);

 // thiagorabaioli/frontend-lostandofund/frontend-lostandofund-1eb8ffea46adda1de78a07b005611f8d29e3b159/src/routes/ClientHome/ItemLostDetails/index.tsx
          function handleDeliverClick() {
            navigate(`/client/itemlosts/${params.itemlostId}/deliver`);
          }

  return (
    <main>
      <section id="product-details-section" className="tfr-container">
        {
          itemlost &&
          <ItemLostDetailsCard itemlost={itemlost} />
        }
        <div className="tfr-btn-page-container">
          {
            contextTokenPayload && authService.hasAnyRoles(['ROLE_ADMIN', 'ROLE_VIGILANTE']) && itemlost?.status &&
            <div onClick={handleDeliverClick}>
              <div className="tfr-btn tfr-btn-blue">Entregar item</div>
            </div>
          }
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}