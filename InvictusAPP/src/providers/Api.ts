import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL_PROD;

export const Api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        Accept: 'application/json',        // Aceita respostas no formato JSON
    },
})