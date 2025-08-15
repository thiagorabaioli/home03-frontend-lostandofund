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
