<script setup lang="ts">
import { useAbsentData } from '@/composables/resources/absence'
const payload=ref<any>({})
const useGetAbsent = ref(true)
useAbsentData({
    queryOptions: {
    enabled: useGetAbsent,
    onSuccess(data) {
      payload.value = data
    }
  }
})
</script>
<template>
  <div class="w-[100%] h-[100%]">
    <n-space class="p-4" vertical :size="24">
    <absent-components-table-all-absent :data="payload"/>
    </n-space>
  </div>
</template>
