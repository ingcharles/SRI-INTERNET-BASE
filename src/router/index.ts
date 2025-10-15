import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Importar vistas
import InicioVista from '@/components/base/paginas/InicioVista.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioVista,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/components/base/paginas/PerfilVista.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/base/paginas/LoginVista.vue'),
  },
  // Ruta catch-all para 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
  {
    path: '/ejemploGrid',
    name: 'ejemploGrid',
    component: () => import('@/components/ejemplos/EjemploGrid.vue'),
  },
  {
    path: '/catalogoB',
    name: 'catalogoB',
    component: () => import('@/components/base/paginas/CatalogoB.vue'),
  },
  {
    path: '/catalogoA',
    name: 'catalogoA',
    component: () => import('@/components/base/paginas/CatalogoA.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
