<script setup lang="ts">
import { useNotification } from 'naive-ui'
import { ref } from 'vue'
import { saveAbsenceApi } from '@/composables/resources/absence'
const notification=useNotification()
const user = useAuthStore()
const photo = ref<File | null>(null)
const loading = ref(false)
const message = ref('')
const emit=defineEmits<{
     (e: 'refetch'): void
}>()
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    photo.value = target.files[0]
  }
}

const submitAbsence = async () => {
  if (!photo.value) {
    message.value = 'Photo must uploaded'
    return
  }
  loading.value = true
  message.value = ''

  try {
    const formData = new FormData()
    if (user.user != undefined) {
      formData.append('userId', user.user.id)
      formData.append('photo', photo.value)
    }

    await saveAbsenceApi(formData)
    photo.value = null
    emit('refetch')
  } catch (err: any) {
    message.value = err.response?.data?.error || 'Gagal absen'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="flex items-center gap-4">
    <div>
      <input type="file" accept="image/*" @change="handleFileChange" />
    </div>
    <button
      @click="submitAbsence"
      :disabled="loading"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {{ loading ? 'Mengirim...' : 'Absen' }}
    </button>
    <p class="text-sm text-gray-700">{{ message }}</p>
  </div>
</template>
