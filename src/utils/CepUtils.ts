import type { CepDTO } from "../dto/Cep";

export class CepUtils {
    public static normalizeCep(cep: string): string {
        return cep.replace("-", "");
    }

    public static emptyCepDTO(): CepDTO {
        return {
            cep: '',
            logradouro: '',
            complemento: '',
            unidade: '',
            bairro: '',
            localidade: '',
            uf: '',
            estado: '',
            regiao: '',
            ibge: '',
            gia: '',
            ddd: '',
            siafi: '',
            erro: false
        };
    }

    public static isCepDifferent(cep: string, actualCep: string): boolean {
        const normalizedCep: string = CepUtils.normalizeCep(cep);
        const normalizedActualCep: string = CepUtils.normalizeCep(actualCep || "");
        return normalizedActualCep !== normalizedCep;
    }
}