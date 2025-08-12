<script setup lang="ts">
import { ref, computed } from 'vue'
import { NInput, NTable, NImage } from 'naive-ui'

const BASE_URL = 'http://103.189.235.175:5410'

// Props atau data awal
const props = defineProps<{
  data: any
}>()

const searchQuery = ref('')

// Filter data berdasarkan nama
const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  const lower = searchQuery.value.toLowerCase()
  return props.data.filter((item:any) =>
    item.user.detail.name.toLowerCase().includes(lower)
  )
})

// Format tanggal ke bahasa Indonesia
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
    <!-- Search -->
    <div class="mb-4 flex justify-between items-center">
      <n-input
        v-model:value="searchQuery"
        placeholder="Cari berdasarkan nama..."
        clearable
        class="w-[250px]"
      />
    </div>

    <!-- Table -->
    <n-table :single-line="false" striped>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Posisi</th>
          <th>Email</th>
          <th>Timestamp</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.user.detail.name }}</td>
          <td>{{ item.user.detail.position }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ formatDate(item.timestamp) }}</td>
          <td>
            <a
              :href="getFullPhotoUrl(item.photoUrl)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <n-image
                width="80"
                :src="getFullPhotoUrl(item.photoUrl)"
                object-fit="cover"
                preview-disabled
              />
            </a>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
