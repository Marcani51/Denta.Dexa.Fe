<route lang="json5">
{
  meta: {
    layout: 'auth.layout'
  }
}
</route>

<script setup lang="ts">
import { type FormInst, type FormRules, type SelectOption } from 'naive-ui'
import { useAuthStore } from './auth.store'
import { type User, type LoginPayload, useLogin } from '@/composables'
import { SSvg } from '@/components'

const showModalKost = ref(false)
const kostSelect = ref()
const route = useRoute()

const query = computed<any>(() => route.query)
console.log(query)
const payloadHeader = computed<any>(() => ({
  organizationId: query.value.idOrganization,
  patientId: query.value.idPatient,
  admissionId: query.value.AdmissionId,
  encounterId: query.value.EncounterId
}))
console.log(payloadHeader)
const formRef = ref<FormInst>()
const user = ref<User>()
const token = ref<string>()
const feedback = ref<{
  status?: 'error' | 'success' | 'warning'
  message?: string
}>({
  status: undefined,
  message: undefined
})
const loginRes = useLogin()
const router = useRouter()
const authStore = useAuthStore()

const formdata = ref<Omit<LoginPayload, 'application_id'>>({
  username: '',
  password: ''
})

const formRules: FormRules = {
  username: [
    {
      message: 'Username wajib diisi',
      required: true,
      trigger: ['focus', 'input']
    }
  ],
  password: [
    {
      message: 'Password wajib diisi',
      required: true,
      trigger: ['focus', 'input']
    }
  ]
}
function onShowForgotpass() {}

const handleSubmit = async () => {
  formRef.value?.validate(async (err) => {
    if (err) return
    const res = await loginRes.mutateAsync(formdata.value)
    console.log(res.token)
    console.log(res)
    if (res.code != 200 || res.status == 'fail') {
      return (feedback.value = {
        message: res.message,
        status: 'error'
      })
    }
    user.value = res.data
    authStore.token = res.token
    authStore.user = user.value
    if (authStore.user) {
      router.push('/dashboard')
      return
    }
  })
}
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center bg-[#F0F1F7]">
    <n-card class="max-w-sm shadow-sm py-32 px-5">
      <div class="flex justify-center">
        <!-- <img src="@/assets/images/Logo_Rehab.png" /> -->
        <span class="text-red-500 font-bold">Employee Management App</span>
      </div>
      <n-form
        ref="formRef"
        :model="formdata"
        :rules="formRules"
        class="mt-10 space-y-2"
        @submit.prevent="handleSubmit"
      >
        <fieldset class="space-y-2 mb-5">
          <n-form-item
            :show-label="false"
            path="user_name"
            :validation-status="feedback.status"
            :feedback="feedback.message"
          >
            <n-input
              v-model:value="formdata.username"
              placeholder="Username"
              @input="feedback = { status: undefined, message: undefined }"
            >
              <template #prefix>
                <n-icon>
                  <s-svg name="icon-user" />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item :show-label="false" path="password">
            <n-input
              v-model:value="formdata.password"
              placeholder="Password"
              show-password-on="click"
              type="password"
            >
              <template #prefix>
                <n-icon>
                  <s-svg name="icon-lock" />
                </n-icon>
              </template>
            </n-input>
            <!-- <div class="absolute right-0 top-10 flex justify-end">
              <n-button text tag="a" target="_blank" type="primary" :on-click="onShowForgotpass">
                <span class="font-bold uppercase">Lupa password?</span>
              </n-button>
            </div> -->
          </n-form-item>
        </fieldset>
        <n-button :loading="loginRes.isLoading.value" block round attr-type="submit" type="primary">
          <span class="font-bold">LOGIN</span>
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<style lang="postcss" module>
.modalWrapper {
  @apply max-w-lg;
}
</style>
