import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import ItemlostListing from "../ClientHome/ItemLostListing";

export default function Admin() {

    return (
        <>
            <HeaderAdmin />

            <ItemlostListing />

            <Outlet />
        </>
    )
}
