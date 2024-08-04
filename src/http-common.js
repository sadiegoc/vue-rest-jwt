/**
 * - configuração das requisições a partir do cliente -
 * aqui definimos que toda requisição que partir
 * dos serviços (arquivos que importam este), deverão
 * utilizar como base a URL http://localhost:3000/auth
 */


import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/auth",
    headers: {
        "Content-Type": "application/json"
    }
});