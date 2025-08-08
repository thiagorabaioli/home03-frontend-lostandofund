import './styles.css';
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as ItemLostService from '../../../services/itemlost-service';
import { useEffect, useState } from 'react';
import { ItemLostDTO } from '../../../models/itemlosts';

type QueryParams = {
    page: number;
    name: string;
}

export default function Catalog() {

    const [isLastPage, setIsLastPage] = useState(false);
    const [itemlosts, setItemlosts] = useState<ItemLostDTO[]>([]);
    const [queryParams, setQueryParam] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    useEffect(() => {
        ItemLostService.findPageRequest(queryParams.page, queryParams.name, 12, "id,desc")
            .then(response => {
                // CORREÇÃO AQUI: Filtramos a resposta para manter apenas itens com status = true
                const newItems = response.data.content.filter((item: ItemLostDTO) => item.status === true);

                setItemlosts(prevItems => [...prevItems, ...newItems]);
                setIsLastPage(response.data.last);
            });
    }, [queryParams]);

    function handleSearch(searchText: string) {
        setItemlosts([]);
        setQueryParam({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParam({ ...queryParams, page: queryParams.page + 1 });
    }

    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                <SearchBar onSearch={handleSearch} />

                <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                    {
                        itemlosts.map(
                            item => <CatalogCard key={item.id} itemlost={item} />
                        )
                    }
                </div>

                {
                    !isLastPage &&
                    <ButtonNextPage onNextPage={handleNextPageClick} />
                }
            </section>
        </main>
    );
}