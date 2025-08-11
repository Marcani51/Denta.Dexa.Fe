<script setup lang="ts">
const props = defineProps<{
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'cancel'): void
  (e: 'update:verif', value: boolean): void
}>()

const verifClick = () => {
  emit('update:verif', true)
}
</script>

<template>
  <n-modal v-model:show="props.isShow">
    <n-card
      style="width: 500px; border-radius: 12px; padding: 20px"
      title="Confirmation"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex flex-col gap-4">
        <span class="text-base text-gray-700">
          Are you sure you want to edit data?
        </span>

        <div class="flex flex-row justify-end gap-3 pt-2">
          <n-button
            round
            type="error"
            size="large"
            class="min-w-[120px] font-semibold"
            @click="emit('cancel')"
          >
            Cancel
          </n-button>
          <n-button
            round
            type="primary"
            size="large"
            class="min-w-[120px] font-semibold"
            @click="verifClick"
          >
            Yes
          </n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>
