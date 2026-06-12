import './style.css';
import { addListeners, setOutputComponents } from './setup';
import loadingIcon from "./assets/loading-svgrepo-com.svg";
import { $ } from 'jquery';
import { Titles } from './setup';

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

const button: JQuery<HTMLButtonElement> = $('#search-button');
const input: JQuery<HTMLInputElement> = $('#cep_id');
const buttonErrorModal: JQuery<HTMLButtonElement> = $('#close-error-modal');

const info: JQuery<HTMLDivElement> = $('#info');
const loading: JQuery<HTMLDivElement> = $('#loading_content');
const overflow: JQuery<HTMLDivElement> = $('#overflow');
const errorModal: JQuery<HTMLDivElement> = $('#error_modal');
const errorDesc: JQuery<HTMLDivElement> = $('#error_desc');
const map: JQuery<HTMLIFrameElement> = $('#map');

const listenerComponents: [JQuery<HTMLButtonElement>, JQuery<HTMLInputElement>, JQuery<HTMLButtonElement>] = [button, input, buttonErrorModal];
const outputComponents: [JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLDivElement>, JQuery<HTMLIFrameElement>] = [info, loading, overflow, errorModal, errorDesc, map];

addListeners(listenerComponents);
setOutputComponents(outputComponents);