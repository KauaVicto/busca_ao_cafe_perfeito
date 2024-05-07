import axios from 'axios';

// Definindo a URL base da API
const API_URL = 'http://192.168.100.38:3001';


// Criando uma instância do Axios com a URL base configurada
export const api = axios.create({
  baseURL: API_URL,
});