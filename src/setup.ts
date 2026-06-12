import type { CepDTO } from "./dto/Cep";
import axios from 'axios';
import { MapRequest } from "./model/MapRequest";
import { CepUtils } from "./utils/CepUtils";

let cep = "";

let divInfo: any = null;
let divLoadingContent: any = null;
let divOverflow: any = null;
let divErrorModal: any = null;
let paragrafError: any = null;
let frameMap: any = null;

let enterDisabled: boolean = false;

let actualInfos: CepDTO = {
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

enum Descriptions {
    INVALID_CEP = "O CEP deve possuir 8 números ou atender ao seguinte formato: 00000-000",
    NO_INFO_CEP = "Nenhuma informação para o CEP foi encontrada! Verifique se o CEP está correto e tente novamente.",
    EMPTY_ADDRESS = "Endereço vazio"
}

export enum Titles {
    NORMAL_BUTTON_SEARCH = "Buscar - Enter",
    DISABLED_BUTTON_SEARCH = "Buscar - (Desabilitado)"
}

enum TimeRate {
    NEW_REQUEST_WAIT = 5000
}

export function addListeners(components: [JQuery<HTMLButtonElement>, JQuery<HTMLInputElement>, JQuery<HTMLButtonElement>]): void {
    const [button, input, buttonErrorModal] = components;

    button.on('click', (event: Event) => onButtonSearchClick(event));
    buttonErrorModal.on('click', () => { toggleErrorModal() });
    input.on('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        setCep(target.value);
    });
}

export function setOutputComponents(components: [JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLIFrameElement>]): void {
    const [info, loading, overflow, errorModal, errorDesc, map] = components;

    divInfo = info;
    divLoadingContent = loading;
    divOverflow = overflow;
    divErrorModal = errorModal;
    paragrafError = errorDesc;
    frameMap = map;
}

function applyWindowListeners(): void {
    window.onkeydown = (event) => {
        if (event.keyCode === 13) {
            onEnter();
        }
    }
}

async function onEnter() {
    if (enterDisabled || !isCepDifferent()) return;

    await buscar();
    enterDisabled = true;

    setTimeout(() => {
        enterDisabled = false;
    }, TimeRate.NEW_REQUEST_WAIT);
}

async function onButtonSearchClick(event?: Event) {
    const button: HTMLButtonElement = event?.target as HTMLButtonElement;
    if (!cep || button.disabled || !isCepDifferent() || enterDisabled) return;
    
    await buscar();
    button.disabled = true;
    button.classList.add("disabled");
    button.title = Titles.DISABLED_BUTTON_SEARCH;

    setTimeout(() => {
        button.disabled = false;
        button.classList.remove("disabled");
        button.title = Titles.NORMAL_BUTTON_SEARCH;
    }, TimeRate.NEW_REQUEST_WAIT);
}

async function buscar() {
    const normalizedCep: string = CepUtils.normalizeCep(cep);
    if (normalizedCep.length !== 8) {
        toggleErrorModal(Descriptions.INVALID_CEP);
        return;
    }

    try {
        openLoading();
        actualInfos = await getCepInformation(normalizedCep);
        const infoStructure = !actualInfos.erro ? createInfoStructure(actualInfos) 
            : createInfoStructure(emptyCepDTO());

        divInfo.html(infoStructure);
        divInfo.css('display', 'flex');

        setMapLocation(actualInfos);
        closeLoading();
    } catch (e) {
        toggleErrorModal(Descriptions.NO_INFO_CEP);
        return;
    }
}

function setMapLocation(response: CepDTO): void {
    const request: MapRequest = new MapRequest('https://www.google.com/maps', response);
    const url = request.get();

    if (request.params.isEmpty()) {
        toggleErrorModal(Descriptions.EMPTY_ADDRESS);
    }
    frameMap.attr("src", url);
}

function setCep(value: string) {
    cep = value;
}

async function getCepInformation(cep: string): Promise<CepDTO> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
}

function createInfoStructure(infos: CepDTO): string {
    if (JSON.stringify(infos) === JSON.stringify(emptyCepDTO())) return '';
    const keys: string[] = Object.keys(infos);
    let html: string = ``;

    for (const key of keys) {
        const label: string = key.toUpperCase();
        const value = formatNoValue(infos[key as keyof CepDTO])

        html += `<div class="sessaoInfo">
                     <b>${label}:</b> ${value}
                 </div>`;
    }
    return html;
}

function toggleErrorModal(description?: string) {
    const isModalOpened = divErrorModal.css("display") === "block";
    const toggle = isModalOpened ? "none" : "block";

    if (description) {
        paragrafError.text(description);
    }

    if (toggle === "none") {
        divErrorModal.removeClass("opened");

        setTimeout(() => {
            divErrorModal.css("display", toggle);
            divOverflow.css("display", toggle);
        }, 180);

    } else {
        divErrorModal.css("display", toggle);
        divOverflow.css("display", toggle);

        setTimeout(() => {
            divErrorModal.addClass("opened");
        }, 50);

    }

}

function emptyCepDTO(): CepDTO {
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

function formatNoValue(value: any) {
    return value || '--';
}
function openLoading(): void {
    divLoadingContent.css("display", "flex");
    divOverflow.css("display", "block");
}

function closeLoading(): void {
    divLoadingContent.css("display", "none");
    divOverflow.css("display", "none");
}

function isCepDifferent(): boolean {
    const normalizedCep: string = CepUtils.normalizeCep(cep);
    const normalizedActualCep: string = CepUtils.normalizeCep(actualInfos.cep || "");
    return normalizedActualCep !== normalizedCep;
}

applyWindowListeners();