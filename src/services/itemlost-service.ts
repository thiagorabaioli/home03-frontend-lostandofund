import axios, { AxiosRequestConfig } from "axios";
import { ItemLostDTO } from "../models/itemlosts";
import { requestBackend } from "../utils/requests";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, size = 12, sort = "description") {
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/itemlosts",
          withCredentials: true, // Adicione esta linha
        params: {
            page,
            size,
            sort 
        }
    }

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/itemlosts/${id}` });
}

export function deleteById(id: number) {
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/itemlosts/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(obj: ItemLostDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/itemlosts/${obj.id}`,
        withCredentials: true,
        data: obj
    }

    return requestBackend(config);
}

export function insertRequest(obj: ItemLostDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/itemlosts",
        withCredentials: true,
        data: obj
    }

    return requestBackend(config);
}
