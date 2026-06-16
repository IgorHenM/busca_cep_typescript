import type { CepDTO } from "../dto/Cep";
import { CepUtils } from "./CepUtils";

export class InfoUtils {
    public static formatNoValue(value: any) {
        return value || '--';
    }

    public static createInfoStructure(infos: CepDTO): string {
        if (JSON.stringify(infos) === JSON.stringify(CepUtils.emptyCepDTO())) return '';
        const keys: string[] = Object.keys(infos);
        let html: string = ``;
    
        for (const key of keys) {
            const label: string = key.toUpperCase();
            const value = InfoUtils.formatNoValue(infos[key as keyof CepDTO])
    
            html += `<div class="sessaoInfo">
                         <b>${label}:</b> ${value}
                     </div>`;
        }
        return html;
    }
}