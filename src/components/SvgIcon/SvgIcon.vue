<template>
  <svg v-if="iconName" :class="['icon', className]" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon'
})
const { name } = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${name}`
})
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 使图标颜色继承字体颜色 */
  overflow: hidden;
}
</style>