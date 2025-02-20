<template>
    <div
        :class="$style['loading-wrapper']"
    >
        Please wait...
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'CustomLoading' })
</script>

<style lang="css" module>
.loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
</style>
