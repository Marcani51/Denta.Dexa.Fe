<script setup lang="ts">
import { flattenPayload, unflattenPayload } from '@/commonfunction'
import type { FieldConfig } from '../../composables/resources/type'
const useGetUser = ref(true)
const useGetRole = ref(true)
const roleDb = ref<any>({})
const roleOptions=ref<any>([])
const editPayload = ref<any>({})
const payload = ref<any>({})
const dataReady = ref(false)
const newData = ref(true)
const showForm = ref(false)
const store = useAuthStore()

function renderDate() {
  payload.value.forEach((item: any) => {
    item.detail.createdDate = new Date(item.createdDate)
    item.detail.updateDate = new Date(item.updateDate)
  })

  useGetUser.value = false
}

function renderRoleOptions() {
  console.log(roleDb.value)
  if(roleDb.value.length >0){
    roleDb.value.forEach((item:any) => {
      const obj={
        label:item.roleName,
        value:item.id
      }
      roleOptions.value.push(obj)
    });
  }
  dataReady.value = true
  useGetRole.value = false
}

const fields = computed<FieldConfig[]>(() => [
  { key: 'username', label: 'Username', type: 'text', required: true },
  { key: 'password', label: 'Password', type: 'text', required: true },
  {
    key: 'roleId',
    label: 'Role',
    type: 'select',
    options: roleOptions.value, // ini akan selalu ikut update
    required: true
  },
  { key: 'email', label: 'Email', type: 'text', required: true },
  {
    key: 'isActive',
    label: 'Active',
    type: 'select',
    options: [
      { label: 'Yes', value: "true" },
      { label: 'No', value: "false" }
    ],
    required: true
  },
  { key: 'detail_name', label: 'Name', type: 'text', required: true },
  { key: 'detail_phone', label: 'Phone Number', type: 'text', required: true },
  {
    key: 'detail_gender',
    label: 'Gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' }
    ],
    required: true
  },
  { key: 'detail_address', label: 'Address', type: 'text', required: true },
  { key: 'detail_position', label: 'Position', type: 'text', required: true }
])

function handleEdit(payload: any) {
  if (payload.id != undefined) newData.value = false
  const flatPayload = flattenPayload(payload)
  const flatPayloadFinal={
    ...flatPayload,
    isActive:flatPayload.isActive===true ? "true" :"false"
  }
  editPayload.value = flatPayloadFinal
  showForm.value = true
}

async function handleSubmit(data: any) {
  const dataFinal = unflattenPayload(data)
  const payloadRender = await renderFinalPayload(dataFinal)
  const payloadFinal = {
    ...payloadRender,
    createdBy: store.user?.detail.name,
    updateBy: store.user?.detail.name,
    detail: {
      ...payloadRender.detail,
      createdBy: store.user?.detail.name,
      updateBy: store.user?.detail.name
    }
  }
  if (newData.value) await saveUserApi(payloadFinal)
  else await updateUserApi(payloadFinal, dataFinal.id)
  useGetUser.value = true
}

useUserData({
  queryOptions: {
    enabled: useGetUser,
    onSuccess(data) {
      payload.value = data
      renderDate()
    }
  }
})

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
      <ssection header> <h1 class="font-bold text-[#006DA4]">USER LIST</h1></ssection>
      <section main>
        <userlist-components-usertable
          :data="payload"
          @update:new-data="handleEdit"
          @update:view-data="handleEdit"
        ></userlist-components-usertable>
        <modal-modalform
          v-model:show="showForm"
          :fields="fields"
          :payload="editPayload"
          @submit="(data) => handleSubmit(data)"
        >
        </modal-modalform>
      </section>
    </n-space>
  </div>
</template>
