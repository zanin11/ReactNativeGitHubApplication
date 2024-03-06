import axios from 'axios';
//Configura axios -> Realiza as requisições para a aplicação
const api = axios.create({
    baseURL: 'https://api.github.com'
});
export default api;