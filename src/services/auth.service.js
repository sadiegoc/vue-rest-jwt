/**
 * arquivo que realiza a conexão direta com o servidor
 * toda comunicação entre cliente e servidor passará por esses arquivos
 */

import http from "@/http-common";

class AuthService {
    register (user) {
        return http.post("/register", user);
    }

    login (user) {
        return http.post("/login", user);
    }
}

export default new AuthService();