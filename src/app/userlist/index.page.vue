<script setup lang="ts">
import { flattenPayload, unflattenPayload } from '@/commonfunction'
import type { FieldConfig } from '../../composables/resources/type'
import { useNotification } from 'naive-ui'
const useGetUser = ref(true)
const useGetRole = ref(true)
const roleDb = ref<any>({})
const roleOptions = ref<any>([])
const editPayload = ref<any>({})
const payload = ref<any>({})
const dataReady = ref(false)
const newData = ref(true)
const showForm = ref(false)
const store = useAuthStore()
const notification = useNotification()
function renderDate() {
  payload.value.forEach((item: any) => {
    item.detail.createdDate = new Date(item.createdDate)
    item.detail.updateDate = new Date(item.updateDate)
  })

  useGetUser.value = false
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
  { key: 'username', label: 'Username', type: 'text', required: true },
  { key: 'password', label: 'Password', type: 'text', required: true },
  {
    key: 'roleId',
    label: 'Role',
    type: 'select',
    options: roleOptions.value,
    required: true
  },
  { key: 'email', label: 'Email', type: 'text', required: true },
  {
    key: 'isActive',
    label: 'Active',
    type: 'select',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' }
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
  console.log(payload)
  if (payload.id != undefined) newData.value = false
  const flatPayload = flattenPayload(payload)
  const flatPayloadFinal = {
    ...flatPayload,
    isActive: flatPayload.isActive === true ? 'true' : 'false'
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
  try {
    console.log(newData.value)
    console.log("WEW")
    if (newData.value===true) await saveUserApi(payloadFinal)
    else await updateUserApi(payloadFinal, dataFinal.id)
    notification.success({
      content:"Success submit data",
      duration:1000
    })
  } catch (er) {
    notification.error({
      content: 'Failed submit data',
      duration:1000
    })
  }

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
      <section header> <h1 class="font-bold text-[#006DA4]">USER LIST</h1></section>
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
          @submit="(data:any) => handleSubmit(data)"
        >
        </modal-modalform>
      </section>
    </n-space>
  </div>
</template>
