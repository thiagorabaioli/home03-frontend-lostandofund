import './styles.css';
import ButtonInverse from "../../../components/ButtonInverse";
import ItemLostDetailsCard from "../../../components/ItemLostDetailsCard";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';
import * as itemlostService from '../../../services/itemlost-service';

export default function ItemLostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [itemlost, setItemlost] = useState<ItemLostDTO>();

  useEffect(() => {
    // CORREÇÃO AQUI: Usar 'id'
    itemlostService.findById(Number(params.id))
      .then(response => {
        setItemlost(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.id]);


  function handleClaimItem() {
    // Futura lógica para reclamar o item
    navigate("/login");
  }

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {
          itemlost &&
          <ItemLostDetailsCard itemlost={itemlost} />
        }
        <div className="dsc-btn-page-container">
          <div onClick={handleClaimItem}>
            <div className="dsc-btn dsc-btn-blue">Reclamar item</div>
          </div>
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}