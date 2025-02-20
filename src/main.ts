import './public-path'
import './assets/main.css'
import './assets/reset.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// ixmport 'element-plus/theme-chalk/index.css'
import myPlugin, { ourPlugin } from './plugins'
import directives from './directives'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'

console.log('VITE_APP_ROUTER_BASE', import.meta.env.VITE_APP_ROUTER_BASE)

const app = createApp(App)
const pinia = createPinia()

app.component('SvgIcon', SvgIcon)

Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key as keyof typeof directives])
})

app.use(myPlugin, { message: 'hello' })
app.use(ourPlugin({ message: 'hello' }))
app.use(router)
app.use(pinia)

app.mount('#app')

// let instance:ReturnType<typeof createApp>

// function render(props = {}) {
//   const { container } = props
//   const app = createApp(App)
//   app.use(router)
//   instance = app.mount(container ? container.querySelector('#app') : '#app')
// }

// // 独立运行时
// if (!window.__POWERED_BY_QIANKUN__) {
//   render()
// }

// // 微前端环境下的生命周期钩子
// export async function bootstrap() {
//   console.log('[vue] vue app bootstraped')
// }

// export async function mount(props) {
//   console.log('[vue] props from main framework', props)
//   console.log('window.__POWERED_BY_QIANKUN__: ', window.__POWERED_BY_QIANKUN__);

//   render(props)
//   props.onGlobalStateChange((state) => {
//     if (state.language) {
//       console.log('子应用接收', state)
//     }
//   })
// }

// export async function unmount() {
//   console.log('[Vue] app unmounted')
//   instance.unmount()
//   instance = null
// }
