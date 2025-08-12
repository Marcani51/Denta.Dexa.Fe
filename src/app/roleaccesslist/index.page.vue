<script setup lang="ts">
import { flattenPayload, unflattenPayload } from '@/commonfunction'

const useGetRole = ref(true)
const roleDb = ref<any>({})
const dataReady = ref(false)
const roleOptions = ref<any>([])
const showForm = ref(false)
const editPayload = ref<any>({})
const store = useAuthStore()

function handleEdit(payload: any) {
    // if (payload.id != undefined) newData.value = false
    const flatPayload = flattenPayload(payload)
    const flatPayloadFinal={
      ...flatPayload,
      isActive:flatPayload.isActive===true ? "true" :"false"
    }
    editPayload.value = flatPayloadFinal
    showForm.value = true
}

function renderRoleOptions() {
  console.log(roleDb.value)
  if (roleDb.value.length > 0) {
    roleDb.value.forEach((item: any) => {
      const obj = {
        label: item.roleName,
        value: item.id
      }
      roleOptions.value.push(obj)
    })
  }
  dataReady.value = true
  useGetRole.value = false
}

const fields = computed<FieldConfig[]>(() => [
  { key: 'roleName', label: 'Role Name', type: 'text', required: true },
  {
    key: 'isActive',
    label: 'Active',
    type: 'select',
    options: [
      { label: 'Yes', value: "true" },
      { label: 'No', value: "false" }
    ],
    required: true
  }
])

async function handleSubmit(data: any) {
  const dataFinal = unflattenPayload(data)
  const payloadRender = await renderRoleBody(dataFinal)
  console.log(payloadRender)
  console.log("FINAL ROLE")
  const payloadFinal = {
    ...payloadRender,
    createdBy: store.user?.detail.name,
    updateBy: store.user?.detail.name,
  }
  await saveRoleApi(payloadFinal)
  useGetRole.value = true
}

useRoleData({
  queryOptions: {
    enabled: useGetRole,
    onSuccess(data) {
      roleDb.value = data
      renderRoleOptions()
    }
  }
})
</script>
<template>
  <div class="w-[100%] h-[100%]">
    <n-space class="p-4" vertical :size="24">
      <ssection header> <h1 class="font-bold text-[#006DA4]">ROLE LIST</h1></ssection>
      <section main>
        <roleaccesslist-components-roletable
          :data="roleDb"
          @refetch="useGetRole = true"
          @update:new-data="handleEdit"
        ></roleaccesslist-components-roletable>
        <modal-modalform
          v-model:show="showForm"
          :fields="fields"
          :payload="editPayload"
          @submit="(data:any) => handleSubmit(data)"
        >

        </modal-modalform>
      </section>
    </n-space>
  </div>
</template>
