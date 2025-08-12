<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-2">
     <n-input
        v-model:value="searchQuery"
        @input="onSearch"
        placeholder="Search by name..."
        class="w-[250px]"
      />
      <n-button @click="showModal">Add User Manual</n-button>
    </div>
    <n-select
      v-model:value="sortOption"
      :options="sortOptions"
      placeholder="Sort by"
      class="w-[200px]"
      @update:value="onSortChange"
    />
  </div>
  <n-table :single-line="false" class="my-3">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Position</th>
        <th>Join Date</th>
        <th>Last Update</th>
        <th>Update By</th>
        <th>Active</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index" @click="clickUser(item)">
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.detail.name }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.email }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.detail.phone }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.detail.address }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.detail.position }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ formatDate(item.createdDate) }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ formatDate(item.updateDate) }}
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.updateBy }}
        </td>

        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          <n-switch :value="item.isActive" @update:value="(val) => onToggleActive(item, val)"  @click.stop/>
        </td>
      </tr>
    </tbody>
  </n-table>
  <modal-modalConfirmation
    :is-show="modalConfirmation"
    @cancel="cancelChange()"
    @update:verif="() => changeStatus()"
  >
  </modal-modalConfirmation>
</template>

<script setup lang="ts">
import { formatDate } from '@/commonfunction'
import { ref } from 'vue'
import { useNotification } from 'naive-ui'
const dataTable = ref<any>([])
const isHovered = ref(false)
const payload = ref<any>({})
const hoveredIndex = ref<number | null>(null)
const modalConfirmation = ref(false)
const pendingToggle = ref<{ item: any; value: boolean } | null>(null)
const originalData = ref<any>([])
const searchQuery = ref('')
const notification = useNotification()

const props=defineProps<{
  data:any
}>()

watch(()=>props.data,(value)=>{
  dataTable.value=value
  originalData.value=value
})
const emit=defineEmits<{
    (e: 'update:viewData', value: any): void
    (e: 'update:newData', value: any): void
     (e: 'showModal'): void
}>()
const sortOption = ref<string | null>(null)
const sortOptions = [
  { label: 'Created Date (Newest)', value: 'createdDesc' },
  { label: 'Created Date (Oldest)', value: 'createdAsc' },
  { label: 'Update Date (Newest)', value: 'updateDesc' },
  { label: 'Update Date (Oldest)', value: 'updateAsc' }
]

const sortedData = computed(() => {
  if (!sortOption.value) return dataTable.value
  return [...dataTable.value].sort((a, b) => {
    if (sortOption.value === 'createdDesc')
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    if (sortOption.value === 'createdAsc')
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    if (sortOption.value === 'updateDesc')
      return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    if (sortOption.value === 'updateAsc')
      return new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime()
    return 0
  })
})

function onSortChange() {
  console.log('Sort changed:', sortOption.value)
}

function showModal() {
  payload.value = {}
  emit('update:newData',payload.value)
}

const onMouseOver = (index: any) => {
  isHovered.value = true
  hoveredIndex.value = index
}
const onMouseLeave = () => {
  isHovered.value = false
  hoveredIndex.value = null
}

function clickUser(value: any) {
  payload.value = value
  emit('update:viewData', payload.value)
}

function onToggleActive(item: any, value: boolean) {
  pendingToggle.value = { item, value }
  modalConfirmation.value = true
}
function cancelChange() {
  modalConfirmation.value = false
  pendingToggle.value = null
}
async function changeStatus() {
  if (pendingToggle.value) {
    pendingToggle.value.item.isActive = pendingToggle.value.value
    const {item}=pendingToggle.value
    const payloadFinal = await renderFinalPayload(item)
    try {
      await updateUserApi(payloadFinal, pendingToggle.value.item.id)
      notification.success({
        content: 'Succed update data',
        duration: 2000
      })
    } catch (err) {
      notification.error({
        content: 'Failed Update data',
        duration: 2000
      })
    }
    pendingToggle.value = null
  }
  modalConfirmation.value = false
}
function onSearch(value: string) {
  searchQuery.value = value
  if (!value) {
    dataTable.value = [...originalData.value]
  } else {
    const lower = value.toLowerCase()
    dataTable.value = originalData.value.filter((item: any) =>
      item.detail.name.toLowerCase().includes(lower)
    )
  }
}
</script>

<style scoped>
.hoverDiv {
  transition: background-color 1s ease;
}
.hovered {
  background-color: #004d74;
  color: white;
}
</style>
