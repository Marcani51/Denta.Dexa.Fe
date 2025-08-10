<script setup lang="ts">
// import { SSvg } from "ui";
// import { NDropdown } from "naive-ui";
import { useNow, useDateFormat } from '@vueuse/core'
import type { DropdownOption } from 'naive-ui'
import type { OnUpdateValue } from 'naive-ui/es/dropdown/src/interface'
import { ref } from 'vue'
import { SSvg } from './s-svg'

const props=defineProps<{
  name: string | undefined
}>()

const emit = defineEmits(['select', 'logout'])

const formatter = ref<string>('dddd, DD MMM YYYY')
const dateTimeNow = useDateFormat(useNow(), formatter)

const dropdownOptions = [
  {
    label: 'Logout',
    key: '/auth/logout'
  }
]


const handleSelect = (e: any) => {
  if (e == '/auth/logout') emit('logout')
}

</script>

<template>
  <nav
    class="sticky top-0 h-14 bg-[#004D74] w-full flex justify-between items-center px-5 text-white z-40"
  >
    <div class="hidden md:block flex-1">
      {{ dateTimeNow }}
    </div>
    <n-space :size="[32, 0]" align="center">
      <s-svg name="icon-question-circle" class="w-4 h-4"></s-svg>
      <n-dropdown trigger="click" :options="dropdownOptions" @select="handleSelect">
        <button text class="text-white font-bold" data-test="name">
          {{ props.name }}
          <s-svg class="w-3 h-3 inline" name="icon-chevron-down"></s-svg>
        </button>
      </n-dropdown>
    </n-space>
  </nav>
</template>
