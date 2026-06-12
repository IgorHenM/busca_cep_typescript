import type { CepDTO } from "../dto/Cep";

export class MapRequest {
    public url: string;
    public params: Params;
    private finalUrl: string;

    constructor(url: string, response: CepDTO) {
        this.url = url;
        this.params = new Params(response);
        this.finalUrl = '';
        this.build();
    }

    public build() {
        const zoom: number = this.params.isBigZone() ? 13 : 20;
        this.finalUrl = `${this.url}?q=${this.params.toReqParam()}&z=${zoom}&output=embed`;
    }

    public get(): string {
        return this.finalUrl;
    }

}

class Params {
    public logradouro: string; 
    public bairro: string; 
    public localidade: string; 
    public uf: string;

    constructor(response: CepDTO) {
        const { logradouro, bairro, localidade, uf} = response;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
    }

    public toReqParam(): string {
        let reqParam: string = '';

        for (const key of Object.keys(this)) {
            reqParam += this.buildParam(this[key as keyof this]);
        }
        return reqParam;
    }

    public isEmpty(): boolean {
        return !this.toReqParam().length;
    }

    private buildParam(value: any) {
        return `${value.replace(" ", "+")}+` || '';
    }

    public isBigZone(): boolean {
        return !this.logradouro && !this.bairro && 
            (this.localidade !== null && this.localidade !== undefined) && 
                (this.uf !== null && this.uf !== undefined);
    }
}