import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})

export const useUserStore = defineStore('user', () => {
    const state = reactive({
        name: 'pinia',
        age: 100
    })
    return { state }
})
