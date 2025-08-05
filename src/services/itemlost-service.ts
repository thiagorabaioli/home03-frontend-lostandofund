import { AxiosRequestConfig } from "axios";
import { ItemLostDTO } from "../models/itemlosts";
import { OwnerDTO } from "../models/owner";
import { requestBackend } from "../utils/requests";

// AQUI ESTÁ A CORREÇÃO: Adicionamos o parâmetro 'name'
export function findPageRequest(page: number, name: string, size = 12, sort = "description") {
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/itemlosts",
        withCredentials: true,
        params: {
            page,
            name, // O nome agora é enviado como parâmetro
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

export function deliverRequest(id: number, owner: OwnerDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/itemlosts/${id}/deliver`,
        withCredentials: true,
        data: owner
    }
    return requestBackend(config);
}

// FUNÇÃO ADICIONADA
export function findPublicItems() {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/itemlosts/public", // Chama o novo endpoint público
    }
    return requestBackend(config);
}