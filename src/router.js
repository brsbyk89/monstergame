import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: () => import('./components/HelloWorld.vue')
        },
        {
            path: '/Test',
            name: 'Test',
            component: () => import('./components/Test.vue')
        }
    ]
})