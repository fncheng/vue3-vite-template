import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    console.log('VITE_APP_ROUTER_BASE', env.VITE_APP_ROUTER_BASE)
    return {
        base: (process.env as any).__POWERED_BY_QIANKUN__ ? '/app-vue2/' : '/vue-app/',
        // build: {
        //   lib: {
        //     entry: './src/main.ts', // 入口文件
        //     name: 'sub-app-vue2',
        //     fileName: (format) => `sub-app-vue2.${format}.js`,
        //     formats: ['umd']
        //   },
        //   rollupOptions: {
        //     external: ['vue'],
        //     output: {
        //       globals: {
        //         vue: 'Vue'
        //       }
        //     }
        //   }
        // },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vue-vendor': ['vue', 'vue-router'],
                        'element-plus': ['element-plus']
                    }
                }
            },
            cssCodeSplit: true
        },
        plugins: [
            vue(),
            vueJsx(),
            // AutoImport({
            //     resolvers: [ElementPlusResolver()]
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()]
            // }),
            ElementPlus({}),
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, 'src/assets/svg/')],
                symbolId: `icon-[name]`,
                inject: 'body-first'
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 7101,
            cors: true,
            host: '0.0.0.0',
            proxy: {
                '/proxyApi': {
                    target: 'http://127.0.0.1:3000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/proxyApi/, '')
                }
            }
        }
    }
})
