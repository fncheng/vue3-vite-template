import { type RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'
import routes from './routes'

const modules = import.meta.glob('../pages/**/*.vue')

export type RouteConfig = Pick<
    RouteRecordRaw,
    'name' | 'path' | 'redirect' | 'component' | 'beforeEnter'
> & {
    path: string
    componentPath?: string
    meta?: {
        requireAuth: boolean
    }
    children?: RouteConfig[]
}

const cachedAsyncComponent = new Map()

/**
 * 延迟加载组件并缓存异步组件
 * @param promise 异步组件
 * @param time 延迟时间
 * @param key 缓存键
 * @returns
 */
export const loadWithDelay = (promise: Promise<any>, time: number, key?: string) => {
    if (key && cachedAsyncComponent.has(key)) {
        return cachedAsyncComponent.get(key)
    }
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)

    key && cachedAsyncComponent.set(key, promise)

    return Promise.all([promise, delayPromise]).then(() => promise)
}

// const Home = defineAsyncComponent(() => import('@/pages/Home.vue'));

const handleAsyncRoutes = (routes: RouteConfig[]): any[] =>
    routes.map((route) => {
        // console.log('route: ', route.componentPath);
        if (route.children && route.children.length > 0) {
            route.children = handleAsyncRoutes(route.children)
        }
        if (route.componentPath) {
            return {
                ...route,
                path: route.path,
                component: modules[`../pages/${route.componentPath}.vue`]
            }
        }
        return route
    })

// const staticRoutes: RouteRecordRaw[] = [
//   { path: '/home', component: () => import('../pages/HomeView.vue') },
//   { path: '/about', component: () => import('../pages/AboutView.vue') }
// ];

const asyncRoutes = handleAsyncRoutes(routes)

const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app-vue2' : '/vue-app'),
    routes: asyncRoutes
})

// asyncRoutes.forEach((route) => router.addRoute(route));

router.beforeEach((to, from, next) => {
    // console.log('to: ', to, from);
    // if (to.path === '/home') {
    //   alert('home');
    // }
    // if (to.path === '/about') {
    //   next('/home');
    // }
    next()
})
export default router
