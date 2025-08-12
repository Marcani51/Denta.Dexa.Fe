<script lang="ts" setup>
import { getUserAbsence } from '@/composables/resources/absence';
import { useNotification } from 'naive-ui';
const user=useAuthStore()
const notification=useNotification()
const dataPayload=ref<any>({})
const dataReady=ref(false)

const getDataAbsent=async()=>{
  try{
    const res=await getUserAbsence(user.user?.id)
    dataPayload.value=res
    dataReady.value=true
  }
  catch(err){
    notification.error({
      content:'Failed get data',
      duration:1000
    })
  }
}

onMounted(async()=>{
    await getDataAbsent()
})
</script>
<template>
  <div class="w-[100%] h-[100%]">
    <n-space class="p-4" vertical :size="24">
      <section header><h1 class="font-bold text-[#006DA4]">Absent Dashboard</h1></section>
      <section main>
        <dashboard-components-header-absent @refetch="getDataAbsent"/>
        <dashboard-components-table-absent v-if="dataReady" :data="dataPayload"/>
      </section>
    </n-space>
  </div>
</template>
