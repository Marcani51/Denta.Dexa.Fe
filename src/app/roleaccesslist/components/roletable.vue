<script setup lang="ts">
import { formatDate } from '@/commonfunction'
import { ref } from 'vue'
import { useNotification } from 'naive-ui'
const dataTable = ref<any>([])
const isHovered = ref(false)
const payload = ref<any>({})
const hoveredIndex = ref<number | null>(null)
const modalConfirmation = ref(false)
const selectedData = ref<any>({})
const originalRow = ref<any>(null)
const user = useAuthStore()
const notification = useNotification()
const originalData = ref<any>([])
const searchQuery = ref('')

const props = defineProps<{
  data: any
}>()

watch(
  () => props.data,
  (value) => {
    dataTable.value = value
    originalData.value = value
  }
)
const emit = defineEmits<{
  (e: 'refetch'): void
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
  emit('update:newData', payload.value)
}

const onMouseOver = (index: any) => {
  isHovered.value = true
  hoveredIndex.value = index
}
const onMouseLeave = () => {
  isHovered.value = false
  hoveredIndex.value = null
}

function cancelChange() {
  if (editingIndex.value !== null && originalRow.value) {
    dataTable.value[editingIndex.value] = JSON.parse(JSON.stringify(originalRow.value))
  }
  modalConfirmation.value = false
  editingIndex.value = null
  originalRow.value = null
}
const editingIndex = ref<number | null>(null)
function startEdit(index: number) {
  if (editingIndex.value !== null && editingIndex.value !== index && originalRow.value) {
    dataTable.value[editingIndex.value] = JSON.parse(JSON.stringify(originalRow.value))
  }
  editingIndex.value = index
  originalRow.value = JSON.parse(JSON.stringify(dataTable.value[index]))
}

const confirmModalSave = (item: any, index: any) => {
  selectedData.value = item
  modalConfirmation.value = true
}

async function saveEdit() {
  try {
    console.log(selectedData.value)
    console.log('WAH')
    const payloadRender = await renderRoleBody(selectedData.value)
    const payloadFinal = {
      ...payloadRender,
      updateBy: user.user?.detail.name
    }

    await updateRoleApi(payloadFinal, selectedData.value.id)
    notification.success({
      content: 'Data updated successfully',
      duration: 2000
    })
    editingIndex.value = null
    originalRow.value = null
    modalConfirmation.value = false
    emit('refetch')
  } catch (err) {
    notification.error({
      content: 'Failed to update data',
      duration: 2000
    })
  }
}
function onSearch(value: string) {
  searchQuery.value = value
  if (!value) {
    dataTable.value = [...originalData.value]
  } else {
    const lower = value.toLowerCase()
    dataTable.value = originalData.value.filter((item: any) =>
      item.roleName.toLowerCase().includes(lower)
    )
  }
}
</script>

<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-2">
      <n-input
        v-model:value="searchQuery"
        @input="onSearch"
        placeholder="Search by role name..."
        class="w-[250px]"
      />
      <n-button @click="showModal">Add Role Manual</n-button>
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
        <th>Role Name</th>
        <th>Created Date</th>
        <th>Last Update</th>
        <th>Update By</th>
        <th>Can View</th>
        <th>Can Edit</th>
        <th>Can checkin</th>
        <th>Active</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index">
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          {{ item.roleName }}
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
          <n-checkbox
            v-model:checked="item.access.view"
            :disabled="editingIndex !== index"
            @click.stop
          />
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          <n-checkbox
            v-model:checked="item.access.edit"
            :disabled="editingIndex !== index"
            @click.stop
          />
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          <n-checkbox
            v-model:checked="item.access.absent"
            :disabled="editingIndex !== index"
            @click.stop
          />
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          <n-switch
            :value="item.isActive"
            :disabled="editingIndex !== index"
            @update:value="(val) => (item.isActive = val)"
            @click.stop
          />
        </td>
        <td
          :class="{ hovered: hoveredIndex === index }"
          class="hoverDiv"
          @mouseover="onMouseOver(index)"
          @mouseleave="onMouseLeave"
        >
          <div class="flex flex-row gap-6 items-center">
            <div class="w-fit h-fit" @click.stop="startEdit(index)">
              <n-icon>
                <s-svg class="m-0 w-10 h-10 inline" name="icon-edit" />
              </n-icon>
            </div>

            <div v-if="editingIndex === index" @click.stop="confirmModalSave(item, index)">
              <n-icon>
                <s-svg class="m-0 w-10 h-10 inline" name="icon-save" />
              </n-icon>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </n-table>
  <modal-modalConfirmation
    :is-show="modalConfirmation"
    @cancel="cancelChange()"
    @update:verif="() => saveEdit()"
  >
  </modal-modalConfirmation>
</template>

<style scoped>
.hoverDiv {
  transition: background-color 1s ease;
}
.hovered {
  background-color: #004d74;
  color: white;
}
</style>
