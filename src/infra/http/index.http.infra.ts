import { HttpInfra } from "./http.infra";

const baseUrl = import.meta.env.VITE_API_URL;

export const httpInfra = () => new HttpInfra(baseUrl);
