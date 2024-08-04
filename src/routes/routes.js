import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";

import middleware from "@/services/middleware.service";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true } // parâmetro utilizado para determinar se o usuário precisa estar autenticado para acessar
    }, {
        path: '/login',
        name: 'login',
        component: LoginView
    }, {
        path: '/register',
        name: 'register',
        component: RegisterView
    }, {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// verifica se a rota precisa de autenticação
// caso precise, valida a autenticação
router.beforeEach((to, from, next) => {
    // verifica primeiro se existe um token salvo
    const isAuthenticated = !!localStorage.getItem("token");

    // apenas quem tem requiresAuth = true
    if (to.matched.some(record => record.meta.requiresAuth)) {

        // caso não exista token
        if (!isAuthenticated) next({ name: 'login' });
        // caso exista, vamos validar
        else {
            const token = localStorage.getItem("token");
            middleware.authorization(token)
            .then(resp => { if (resp.status == 200) next(); })
            .catch(() => next({ name: 'login' }));
        }

    } else {
        // para as rotas login e register 
        // caso o usuário esteja logado, ele não os acessa
        if (!isAuthenticated) next();
    }
});

export default router;