<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NCard, NForm, NFormItem, NInput, NSelect, NDatePicker, NButton, useNotification } from 'naive-ui'
import { type FormInst, type FormRules } from 'naive-ui'
import { EyeOutline, EyeOffOutline } from '@vicons/ionicons5'

const notification=useNotification()
type FieldType = 'number' | 'text' | 'textarea' | 'date' | 'select'

interface FieldConfig {
  key: string
  label: string
  type: FieldType
  required?: boolean
  options?: { label: string; value: string | number | boolean }[]
}

const props = defineProps<{
  show: boolean
  fields: FieldConfig[]
  payload: Record<string, any> // editPayload atau {}
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'submit', value: any): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInst | null>(null)
const formModel = ref<Record<string, any>>({})

const rules = computed<FormRules>(() => {
  const r: FormRules = {}
  props.fields.forEach((field) => {
    if (field.required) {
      r[field.key] = [
        {
          required: true,
          message: `${field.label} is required`,
          trigger: ['blur', 'input'] // bisa diubah sesuai kebutuhan
        }
      ]
    }
  })
  return r
})

watch(
  () => props.payload,
  (val) => {
    formModel.value = JSON.parse(JSON.stringify(val || {}))
  },
  { immediate: true }
)

const passwordVisible = ref(false)

function togglePasswordView() {
  passwordVisible.value = !passwordVisible.value
}

function handleSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('submit', formModel.value)
      emit('update:show', false)
    } else {
      notification.error({
        content:'Please fill required field'
      })
    }
  })
}

function handleCancel() {
  emit('cancel')
  emit('update:show', false)
}

function generateUsername() {
  formModel.value.username = `user_${Math.floor(1000 + Math.random() * 9000)}`
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  formModel.value.password = Array.from({ length: 12 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('')
}
</script>

<template>
  <n-modal v-model:show="props.show" preset="card" title="User Form" style="width: 600px">
    <n-form ref="formRef" :model="formModel" :rules="rules" label-placement="top">
      <div class="flex flex-wrap gap-x-4 gap-y-4">
        <template v-for="field in props.fields" :key="field.key">
          <div class="flex-1 min-w-[250px]">
            <n-form-item :label="field.label" :path="field.key" :required="field.required">
              <template v-if="field.key === 'username'">
                <div class="flex gap-2 w-full">
                  <n-input
                    v-model:value="formModel[field.key]"
                    type="text"
                    :placeholder="`Enter ${field.label}`"
                  />
                  <n-button type="primary" ghost @click="generateUsername">Generate</n-button>
                </div>
              </template>

              <template v-else-if="field.key === 'password'">
                <div class="flex gap-2 w-full">
                  <n-input
                    v-model:value="formModel[field.key]"
                    :type="passwordVisible ? 'text' : 'password'"
                    :placeholder="`Enter ${field.label}`"
                  >
                    <template #suffix>
                      <n-button text style="padding: 0" @click="togglePasswordView">
                        <n-icon size="18">
                          <component :is="passwordVisible ? EyeOffOutline : EyeOutline" />
                        </n-icon>
                      </n-button>
                    </template>
                  </n-input>
                  <n-button type="primary" ghost @click="generatePassword">Generate</n-button>
                </div>
              </template>
              <template v-else>
                <component
                  :is="
                    field.type === 'text' || field.type === 'number'
                      ? NInput
                      : field.type === 'textarea'
                      ? NInput
                      : field.type === 'select'
                      ? NSelect
                      : field.type === 'date'
                      ? NDatePicker
                      : NInput
                  "
                  v-model:value="formModel[field.key]"
                  v-bind="
                    field.type === 'textarea'
                      ? { type: 'textarea' }
                      : field.type === 'text' || field.type === 'number'
                      ? { type: field.type }
                      : field.type === 'select'
                      ? { options: field.options }
                      : {}
                  "
                  :placeholder="`Enter ${field.label}`"
                  class="w-full"
                />
              </template>
            </n-form-item>
          </div>
        </template>
      </div>
    </n-form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <n-button @click="handleCancel" round>Cancel</n-button>
        <n-button @click="handleSubmit" type="primary" round>Save</n-button>
      </div>
    </template>
  </n-modal>
</template>

