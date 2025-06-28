import { HttpInfra } from "./http.infra";

const baseUrl = import.meta.env.BASE_URL;

export const httpInfra = () => new HttpInfra(baseUrl);
