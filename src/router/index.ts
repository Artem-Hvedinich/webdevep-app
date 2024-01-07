import {createRouter, createWebHistory, Router} from 'vue-router'
import login from "../page/login.vue";
import profile from "../page/profile.vue";
import home from "../page/home.vue";
import {routerRedirectMiddleware} from "webdevep-lib";


const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
    },
]
const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
routerRedirectMiddleware(router, '/login', '/profile')
export default router
