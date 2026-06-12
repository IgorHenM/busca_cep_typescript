export class CepUtils {
    public static normalizeCep(cep: string): string {
        return cep.replace("-", "");
    } 
}