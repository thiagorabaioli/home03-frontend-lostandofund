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
    // AQUI ESTÁ A CORREÇÃO: Usar 'itemlostId' que foi definido na rota
    itemlostService.findById(Number(params.itemlostId))
      .then(response => {
        setItemlost(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params.itemlostId]);


  function handleClaimItem() {
    navigate("/cart"); // Simplificado para ir para o carrinho/lista
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