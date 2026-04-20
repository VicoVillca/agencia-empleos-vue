import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CategoriaList from '@/views/categoria/CategoriaList.vue'
import CategoriaForm from '@/views/categoria/CategoriaForm.vue'
import TrabajoList from '@/views/trabajo/TrabajoList.vue'
import TrabajoForm from '@/views/trabajo/TrabajoForm.vue'
import TrabajoDetail from '@/views/trabajo/TrabajoDetail.vue'
import { isLogin } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriaList,
      meta: { requiresAuth: true },
    },
    {
      path: '/categorias/nuevo',
      name: 'categoriaNew',
      component: CategoriaForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/categorias/:id/editar',
      name: 'categoriaEdit',
      component: CategoriaForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/trabajos',
      name: 'trabajos',
      component: TrabajoList,
      meta: { requiresAuth: true },
    },
    {
      path: '/trabajos/nuevo',
      name: 'trabajoNew',
      component: TrabajoForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/trabajos/:id/editar',
      name: 'trabajoEdit',
      component: TrabajoForm,
      meta: { requiresAuth: true },
    },
    {
      "path": "/trabajos/:id",
      "name": "trabajoDetail",
      "component": TrabajoDetail,
      "meta": { "requiresAuth": true }
    },
    {
      "path": "/postulaciones",
      "name": "postulaciones",
      "component": () => import('@/views/postulacion/PostulacionList.vue'),
      "meta": { "requiresAuth": true }
    },
    {
      "path": "/postulaciones/nuevo",
      "name": "postulacionNew",
      "component": () => import('@/views/postulacion/PostulacionForm.vue'),
      "meta": { "requiresAuth": true }
    },
    {
      "path": "/postulaciones/:id/editar",
      "name": "postulacionEdit",
      "component": () => import('@/views/postulacion/PostulacionForm.vue'),
      "meta": { "requiresAuth": true }
    },
    {
      "path": "/about",
      "name": "about",
      "component": () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.path === '/login' && isLogin()) {
    return '/'
  } else if (to.meta.requiresAuth && !isLogin()) {
    // Si la ruta requiere autenticación y no está logueado, redirgir a login
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router