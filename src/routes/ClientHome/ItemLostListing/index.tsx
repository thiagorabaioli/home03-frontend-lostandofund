import './styles.css';
import * as itemLostService from '../../../services/itemlost-service';
import editIcon from '../../../assets/edit.svg';
// import deleteIcon from '../../../assets/delete.svg'; // Ícone removido
import { useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';

type QueryParams = {
    page: number;
    name: string;
}

export default function ItemlostListing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação com sucesso!"
    });

    // A lógica de confirmação de apagar pode ser removida
    // const [dialogConfirmationData, setDialogConfirmationData] = useState({
    //     visible: false,
    //     id: 0,
    //     message: "Tem certeza?"
    // });

    const [isLastPage, setIsLastPage] = useState(false);
    const [itemlost, setItemLost] = useState<ItemLostDTO[]>([]);
    const [queryParams, setQueryParam] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    useEffect(() => {
        itemLostService.findPageRequest(queryParams.page, queryParams.name, 12, "id")
            .then(response => {
                const nextPage = response.data.content;
                setItemLost(queryParams.page === 0 ? nextPage : itemlost.concat(nextPage));
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewProductClick() {
      navigate("/client/itemlosts/create"); // Alterado de /admin para /client
    }

    function handleSearch(searchText: string) {
        setItemLost([]);
        setQueryParam({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParam({ ...queryParams, page: queryParams.page + 1 });
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleUpdateClick(itemlostId: number) {
      navigate(`/client/itemlosts/${itemlostId}`); // Alterado de /admin para /client
     } 

    // As funções handleDeleteClick e handleDialogConfirmationAnswer já não são necessárias
    /*
    function handleDeleteClick(productId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, id: productId, visible: true });
    }

    function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
        if (answer) {
            itemLostService.deleteById(productId)
                .then(() => {
                    setItemLost([]);
                    setQueryParam({ ...queryParams, page: 0 });
                })
                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    })
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    }
    */

    function handleDeliverClick(itemlostId: number) {
     navigate(`/client/itemlosts/${itemlostId}/deliver`); // Alterado de /admin para /client
    }

    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Itens Perdidos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div onClick={handleNewProductClick}>
                        <ButtonInverse text="Novo Item" />
                    </div>
                </div>

                <SearchBar onSearch={handleSearch} />

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-txt-left">Descrição</th>
                            <th className="dsc-tb768">Data</th>
                            <th className="dsc-tb768">Status</th>
                            <th></th>
                            <th></th>
                            {/* Coluna do ícone de apagar removida */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemlost.map(item => (
                                <tr key={item.id}>
                                    <td className="dsc-tb576">{item.id}</td>
                                    <td><img className="dsc-product-listing-image" src={item.imgUrl} alt={item.description} /></td>
                                    <td className="dsc-txt-left">{item.description}</td>
                                    <td className="dsc-tb768">{new Date(item.foundDate).toLocaleDateString()}</td>
                                    <td className="dsc-tb768">{item.status ? "Perdido" : "Entregue"}</td>
                                    <td>
                                        {item.status && <div onClick={() => handleDeliverClick(item.id)} className="dsc-product-listing-btn">Entregar</div>}
                                    </td>
                                    <td><img onClick={() => handleUpdateClick(item.id)} className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                    {/* Célula com o ícone de apagar removida */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>
            
            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose}
                />
            }

            { /* O DialogConfirmation já não é necessário */ }
        </main>
    );
}