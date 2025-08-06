import './styles.css';
import * as itemLostService from '../../../services/itemlost-service';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
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

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        message: "Tem certeza?"
    });

    const [isLastPage, setIsLastPage] = useState(false);
    const [itemlost, setItemLost] = useState<ItemLostDTO[]>([]);
    const [queryParams, setQueryParam] = useState<QueryParams>({
        page: 0,
        name: ""
    });

   useEffect(() => {
        // CORREÇÃO AQUI: Passamos o parâmetro de ordenação para o serviço
        itemLostService.findPageRequest(queryParams.page, queryParams.name, 12, "id")
            .then(response => {
                const nextPage = response.data.content;
                setItemLost(queryParams.page === 0 ? nextPage : itemlost.concat(nextPage));
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleNewProductClick() {
        navigate("/admin/itemlosts/create");
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
        navigate(`/admin/itemlosts/${itemlostId}`);
    }

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

    // CORREÇÃO FINAL: Esta função agora navega para a página do formulário de entrega
    function handleDeliverClick(itemlostId: number) {
        navigate(`/admin/itemlosts/${itemlostId}/deliver`);
    }

     return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                {/* ... (título, botão e barra de pesquisa) ... */}

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-txt-left">Descrição</th>
                            <th className="dsc-tb768">Data</th> {/* Coluna Adicionada */}
                            <th className="dsc-tb768">Status</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemlost.map(item => (
                                <tr key={item.id}>
                                    <td className="dsc-tb576">{item.id}</td>
                                    <td><img className="dsc-product-listing-image" src={item.imgUrl} alt={item.description} /></td>
                                    <td className="dsc-txt-left">{item.description}</td>
                                    {/* Célula com a data formatada */}
                                    <td className="dsc-tb768">{new Date(item.foundDate).toLocaleDateString()}</td>
                                    <td className="dsc-tb768">{item.status ? "Perdido" : "Entregue"}</td>
                                    <td>
                                        {item.status && <div onClick={() => handleDeliverClick(item.id)} className="dsc-product-listing-btn">Entregar</div>}
                                    </td>
                                    <td><img onClick={() => handleUpdateClick(item.id)} className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                    <td><img onClick={() => handleDeleteClick(item.id)} className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" /></td>
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

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmationAnswer}
                />
            }
        </main>
    );
}