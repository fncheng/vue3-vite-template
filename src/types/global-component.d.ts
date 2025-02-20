import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        Await: typeof import('../components/Await.vue')['default']
        SvgIcon: typeof import('../components/SvgIcon/SvgIcon.vue')['default']
        Image: typeof import('../components/NewImage.vue')['default']
    }
}