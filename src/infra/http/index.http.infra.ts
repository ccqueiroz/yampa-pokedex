import { HttpInfra } from "./http.infra";

const baseUrl = '';

export const httpInfra = () => new HttpInfra(baseUrl);