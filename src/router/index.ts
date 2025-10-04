import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Importar vistas
import InicioVista from '@/vistas/InicioVista.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Inicio',
        component: InicioVista
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('@/vistas/PerfilVista.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/vistas/LoginVista.vue')
    },
    // Ruta catch-all para 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
