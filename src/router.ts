import {createRouter, createWebHashHistory} from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/button',
            component: () => import('./views/ButtonView.vue')
        },
        {
            path: '/nameTag',
            component: () => import('./views/NameTagView.vue')
        },
        {
            path: '/input',
            component: () => import('./views/InputView.vue')
        },
    ]
})
