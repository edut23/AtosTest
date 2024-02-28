import axios from "axios";

import { responseInterceptor } from "./interceptor";
import { errorInterceptor } from "./interceptor";

const Api = axios.create({
    baseURL: "http://localhost:3000"
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export {Api}