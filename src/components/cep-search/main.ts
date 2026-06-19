import './style.css';
import { addListeners, setOutputComponents } from './setup';
import loadingIcon from "../../assets/loading-svgrepo-com.svg";
import { $, Selector } from '../../utils/TagSelector';
import { Titles } from "../../utils/Constants";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="modal_overflow" id="overflow" style="display: none;">
        <div class="loading" id="loading_content" style="display: none;">
            <img src="${loadingIcon}" class="loading_icon">
            <p class="loading_desc">Carregando...</p>
        </div>
        <div class="modal_error" id="error_modal" style="display: none;">
            <div class="header">
                <div class="icon">
                    <p class="error_icon">!</p>
                </div>
                <h4 class="error_title">Erro</h4>
            </div>
            <p class="error_desciption" id="error_desc"></p>
            <div class="buttons">
                <button id="close-error-modal" class="btn_close">Fechar</button>
            </div>
        </div>
    </div>
    <div class="form">
        <h1 class="titulo">Busque Informações de um CEP:</h1>
        <div class="interact">
            <label for="cep">CEP:</label>
            <input class="cep" type="text" name="cep" id="cep_id">
            <button class="search" id="search-button" title="${Titles.NORMAL_BUTTON_SEARCH}">Buscar</button>
        </div>
    </div>
    <div class="componente_mapa">
        <iframe id="map" class="map" src="https://www.google.com/maps?q=Brasilia&z=10&output=embed" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div id="info" style="display: none;">
        
    </div>
`

const button: Selector<HTMLButtonElement> = $('#search-button') as Selector<HTMLButtonElement>;
const input: Selector<HTMLInputElement> = $('#cep_id') as Selector<HTMLInputElement>;
const buttonErrorModal: Selector<HTMLButtonElement> = $('#close-error-modal') as Selector<HTMLButtonElement>;

const info: Selector<HTMLDivElement> = $('#info') as Selector<HTMLDivElement>;
const loading: Selector<HTMLDivElement> = $('#loading_content') as Selector<HTMLDivElement>;
const overflow: Selector<HTMLDivElement> = $('#overflow') as Selector<HTMLDivElement>;
const errorModal: Selector<HTMLDivElement> = $('#error_modal') as Selector<HTMLDivElement>;
const errorDesc: Selector<HTMLDivElement> = $('#error_desc') as Selector<HTMLDivElement>;
const map: Selector<HTMLIFrameElement> = $('#map') as Selector<HTMLIFrameElement>;

const listenerComponents: [Selector<HTMLButtonElement>, Selector<HTMLInputElement>, Selector<HTMLButtonElement>] = [button, input, buttonErrorModal];
const outputComponents: [Selector<HTMLDivElement>, Selector<HTMLDivElement>, Selector<HTMLDivElement>, Selector<HTMLDivElement>, Selector<HTMLDivElement>, Selector<HTMLIFrameElement>] = [info, loading, overflow, errorModal, errorDesc, map];

addListeners(listenerComponents);
setOutputComponents(outputComponents);