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

  function handleDeliverClick() {
    navigate(`/admin/itemlosts/${params.itemlostId}/deliver`);
  }

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {
          itemlost &&
          <ItemLostDetailsCard itemlost={itemlost} />
        }
        <div className="dsc-btn-page-container">
          {
            contextTokenPayload && authService.hasAnyRoles(['ROLE_ADMIN', 'ROLE_VIGILANTE']) && itemlost?.status &&
            <div onClick={handleDeliverClick}>
              <div className="dsc-btn dsc-btn-blue">Entregar item</div>
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