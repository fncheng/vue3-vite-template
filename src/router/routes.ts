import { type RouteConfig } from '.'

const routes: RouteConfig[] = [
    {
        path: '/',
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: 'home',
                component: () => import('@/pages/Home.vue')
            }
        ]
    }
]

export default routes
