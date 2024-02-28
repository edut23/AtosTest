import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    return Promise.reject(error)
}