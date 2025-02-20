<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ProvideGlobalContext } from './context'

ProvideGlobalContext()
</script>

<template>
    <div class="app-layout">
        <ul class="sidebar-wrapper">
            <RouterLink to="/">/</RouterLink>
            <RouterLink to="/home">Home</RouterLink>
        </ul>

        <!-- <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition name="fade" mode="out-in">
                <Suspense>
                    <component :is="Component"></component>
                    <template #fallback>正在加载中...</template>
                </Suspense>
            </Transition>
        </template>
    </RouterView> -->
        <Suspense>
            <template #fallback>Loading...</template>
            <template #default>
                <main class="flex flex-1">
                    <RouterView :key="$route.fullPath" />
                </main>
            </template>
        </Suspense>
    </div>
</template>

<style>
.app-layout {
    display: flex;
    height: 100%;
    flex: 1;
}
.sidebar-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    min-width: fit-content;
    padding-right: 10px;
}
</style>
