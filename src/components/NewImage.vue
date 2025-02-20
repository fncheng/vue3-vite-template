<template>
    <div :style="{ width: `${width}px` }" v-if="error" @click="retry" class="error-placeholder">
        <slot name="error">Image failed to load.Click to retry.</slot>
    </div>
    <img
        v-if="mode === 'lazy'"
        ref="imgRef"
        :width="width"
        :height="height"
        :data-src="src"
        v-lazy-load-img
        @load="loading = false"
    />
    <template v-else-if="mode === 'preload' && showImage">
        <img :width="width" :height="height" ref="imgRef" :src="imgSrc" />
    </template>
    <slot v-if="loading" name="loading" class="loading-placeholder">Image Loading...</slot>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'NewImage' })
const {
    src,
    mode = 'lazy',
    width,
    height
} = defineProps<{
    src: string
    mode?: 'lazy' | 'preload'
    width: number | `${number}` | undefined
    height?: number | `${number}` | undefined
}>()

const error = ref<boolean>(false)
const loading = ref<boolean>(true)

const imgSrc = ref('')
const imgRef = ref<HTMLImageElement>()
const showImage = ref<boolean>(false)

const preload = () => {
    const img = new Image()
    img.src = src
    img.onload = () => {
        imgSrc.value = img.src
        console.log('图片预加载完成')
        showImage.value = true
    }
    img.onerror = () => {
        error.value = true
        console.error('图片加载失败')
    }
}
mode === 'preload' && preload()

const retry = () => {
    error.value = false
    showImage.value = false
    preload()
}
</script>

<style lang="css" scoped>
.loading-placeholder {
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
}

.error-placeholder {
    width: 100%;
    height: 200px;
    background-color: #ffe5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #e53935;
}
</style>
