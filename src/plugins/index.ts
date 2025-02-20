import { inject, type App, type ObjectPlugin } from 'vue'

const myPlugin: ObjectPlugin<{ message: string }> = {
    install(app: App, options) {
        console.log('app: ', app)
        // 不推荐
        app.config.globalProperties.$myPluginMethod = () => {
            console.log('myPluginMethod')
        }
        // 推荐
        const myPluginMethod = () => {
            console.log('myPluginMethod', options.message)
        }
        app.provide('myPluginMethod', myPluginMethod)
    }
}

export const ourPlugin = (options: { message: string }) => {
    return {
        install(app: App) {
            console.log('app: ', app)
            const ourPluginMethod = () => {
                console.log('ourPluginMethod', options.message)
            }
            app.provide('ourPluginMethod', ourPluginMethod)
        }
    }
}

export function useMyPlugin() {
    const myPluginMethod = inject<() => void>('myPluginMethod')
    if (!myPluginMethod) {
        throw new Error('myPlugin is not provided. Make sure to use app.use(myPlugin)!')
    }
    return { myPluginMethod }
}

export function useOurPlugin() {
    const ourPluginMethod = inject<() => void>('ourPluginMethod')
    if (!ourPluginMethod) {
        throw new Error('ourPlugin is not provided. Make sure to use app.use(ourPlugin)!')
    }
    return { ourPluginMethod }
}

export default myPlugin
