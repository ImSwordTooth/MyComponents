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
        {
            path: '/slider',
            component: () => import('./views/SliderView.vue')
        },
        {
            path: '/checkbox',
            component: () => import('./views/CheckboxView.vue')
        },
		{
			path: '/popover',
			component: () => import('./views/PopoverView.vue')
		},
		{
			path: '/switch',
			component: () => import('./views/SwitchView.vue')
		},
    ]
})
