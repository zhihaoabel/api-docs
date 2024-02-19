<script lang="ts" setup>
import type {DefaultTheme} from 'vitepress/theme'

defineProps<{
  icon?: DefaultTheme.FeatureIcon
  message?: string
  type?: string
}>()
</script>

<template>
  <div :class="{
                      'bg-[#f0f9eb] text-[#67c23a] dark:bg-gray-700 dark:text-[#75b798]': type === 'success',
                      'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300': type === 'error',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300': type === 'warning',
                      'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300': type === 'info',
                    }"
       class="custom-alert w-full mx-auto rounded-md my-3">
    <div class=" px-4 py-3 rounded-md flex items-center justify-between">
      <div v-if="icon"
           class="icon"
           v-html="icon"></div>
      <p class="text-sm" v-html="message"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}
</style>