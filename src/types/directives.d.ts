import type { FunctionDirective, ObjectDirective } from 'vue'

declare module 'vue' {
    interface ComponentCustomProperties {
        vBgColor: ObjectDirective<any, string>
        vColor: FunctionDirective<any, string>
        vAlertColor: FunctionDirective<any, string>
        vLazyLoad: ObjectDirective<any, boolean>
        vLazyLoadImg: ObjectDirective<any, void>
    }
}
