import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import ChatForm from '../components/ChatForm.vue';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    return Cookies.get('accessToken') !== undefined;
};

const authGuard = (to, from, next) => {
    if (isAuthenticated()) {
        next();
    } else {
        next('/');
    }
};

const routes = [
    { path: '/', component: LoginForm },
    {
        path: '/chat', component: ChatForm,
        beforeEnter: authGuard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
