export {} // 确保这是一个模块，避免全局污染

declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: boolean
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string
    }
}
