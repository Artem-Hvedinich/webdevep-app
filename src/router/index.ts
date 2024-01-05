import {createRouter, createWebHistory, Router} from 'vue-router'
import login from "../page/login.vue";
import profile from "../page/profile.vue";
import home from "../page/home.vue";
import {useAuthStore} from "../stores/auth.ts";


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

router.beforeEach((to, from, next) => {
    const userStore = useAuthStore()
    if (to.path === '/login' && userStore.isAuth) next('/profile');
    else if (to.path !== '/login' && !userStore.isAuth) next('/login');
    else next();

});
export default router
