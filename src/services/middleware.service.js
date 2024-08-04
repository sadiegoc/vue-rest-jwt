/**
 * arquivo que realiza a conexão direta com o servidor
 * toda comunicação entre cliente e servidor passará por esses arquivos
 */

import http from "@/http-common";

class MiddlewareService {
    authorization (token) {
        const config = { headers: { authorization: 'Bearer ' + token } };
        return http.get('/authorization', config);
    }
}

export default new MiddlewareService();