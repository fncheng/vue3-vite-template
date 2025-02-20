<template>
    <slot v-if="error" name="error"></slot>
    <slot v-else name="default" :data="data"></slot>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'

defineOptions({ name: 'AwaitComponent' })

const props = defineProps<{ resolve: Promise<any> }>()
defineSlots<{ default: (props: { data: any }) => any; error: () => any }>()

const data = ref(null)
const error = ref<boolean>(false)

await props.resolve
    .then((res) => (data.value = res))
    .catch((e) => {
        console.error(e)
        error.value = true
    })
</script>
