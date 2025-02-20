import { inject, provide, reactive, readonly } from 'vue'

type StoreType = {
    name: string
    age: number
}

type ContextType = {
    state: Readonly<StoreType>
    incrementAge: () => void
    updateName: () => void
}

export function ProvideGlobalContext() {
    const __state = reactive<StoreType>({
        name: 'zs',
        age: 20
    })
    const incrementAge = () => {
        __state.age++
    }
    const updateName = () => {
        __state.name += '1'
    }
    provide('GlobalContext', { state: readonly(__state), incrementAge, updateName })
}

export function useGlobalContext() {
    const context = inject<ContextType>('GlobalContext')
    if (!context) {
        throw new Error('useGlobalContext must be used within a ProvideGlobalContext!')
    }
    return context
}
