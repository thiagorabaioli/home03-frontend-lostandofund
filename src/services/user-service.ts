import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { UserCrudDTO } from "../models/user-crud";


export function findMe() {

    const config : AxiosRequestConfig = {
        url: "/userapp/me",
        withCredentials: true
    }

    return requestBackend(config);
}


export function findAllUsers(page: number, size = 20) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/userapp",
        withCredentials: true,
        params: {
            page,
            size,
        },
    };
    return requestBackend(config);
}

export function insertUser(user: UserCrudDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/userapp",
        withCredentials: true,
        data: user,
    };
    return requestBackend(config);
}
export function findById(id: number) {
    const config: AxiosRequestConfig = {
        url: `/userapp/${id}`,
        withCredentials: true,
    };
    return requestBackend(config);
}

export function updateUser(id: number, user: UserCrudDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/userapp/${id}`,
        withCredentials: true,
        data: user,
    };
    return requestBackend(config);
}

export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/userapp/${id}`,
        withCredentials: true,
    };
    return requestBackend(config);
}
