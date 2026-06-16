import axios, { type AxiosResponse } from "axios";
import type { CepDTO } from "../dto/Cep";

export class CepService {
    public static async getCepInformation(cep: string): Promise<AxiosResponse<CepDTO>> {
        return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}