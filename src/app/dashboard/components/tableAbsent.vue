<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { NDatePicker, NTable, NImage, NButton, NPagination } from 'naive-ui'

const props = defineProps<{
  data: any
}>()

const BASE_URL = 'http://103.189.235.175:5410'
const dataAbsence = ref<any>([])
const detailUser=ref<any>({})
watch(
  () => props.data,
  (value) => {
    dataAbsence.value = value.absence
    detailUser.value=value.user
  },
  { immediate: true }
)

const selectedDateRange = ref<[number, number] | null>(null)
const currentPage = ref(1)
const pageSize = 4

const filteredData = computed(() => {
  if (!selectedDateRange.value) return dataAbsence.value
  const [start, end] = selectedDateRange.value
  return dataAbsence.value.filter((item: any) => {
    const ts = new Date(item.timestamp).getTime()
    return ts >= start && ts <= end
  })
})

// Data untuk halaman aktif
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredData.value.slice(start, end)
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium'
  })
}

function getFullPhotoUrl(path: string) {
  return `${BASE_URL}${path}`
}
</script>

<template>
  <div class="p-4">
     <div class="mb-4">
    <div class="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
      <div>
        <h2 class="text-lg font-semibold">{{ detailUser.detail.name }}</h2>
        <p class="text-sm text-gray-600">{{ detailUser.detail.position }}</p>
        <p class="text-sm text-gray-500">{{ detailUser.email }}</p>
        <p class="text-sm text-gray-500">{{ detailUser.detail.phone }}</p>
      </div>
    </div>
  </div>
    <div class="flex justify-between items-center mb-4">
      <n-date-picker
        v-model:value="selectedDateRange"
        type="daterange"
        clearable
        placeholder="Pilih rentang tanggal"
      />
      <n-button @click="selectedDateRange = null">Reset</n-button>
    </div>

    <n-table :single-line="false" striped>
      <thead>
        <tr>
          <th>No</th>
          <th>Timestamp</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="item.id">
          <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
          <td>{{ formatDate(item.timestamp) }}</td>
          <td>
            <a
              :href="getFullPhotoUrl(item.photoUrl)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <n-image
                width="100"
                :src="getFullPhotoUrl(item.photoUrl)"
                object-fit="cover"
                preview-disabled
              />
            </a>
          </td>
        </tr>
      </tbody>
    </n-table>

    <div class="mt-4 flex justify-center">
      <n-pagination
        v-model:page="currentPage"
        :page-count="Math.ceil(filteredData.length / pageSize)"
        :show-size-picker="false"
      />
    </div>
  </div>
</template>
