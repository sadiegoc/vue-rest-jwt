import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
// import { protect } from "app/middlewares/auth.middleware";
import middleware from "@/services/middleware.service";
import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "@/views/ProfileView.vue";

const routes = [
    {
        path: '/',
        alias: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (!isAuthenticated) next({ name: 'login' });
        else {
            const token = localStorage.getItem("token");
            middleware.authorization(token)
            .then(resp => { if (resp.status == 200) next(); })
            .catch(() => next({ name: 'login' }));
        }

    } else {
        if (!isAuthenticated) next();
    }
});

export default router;