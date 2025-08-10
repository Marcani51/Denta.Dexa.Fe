<script setup lang="ts">
import type { GlobalThemeOverrides, MessageProviderProps } from 'naive-ui'
import { computed, ref } from 'vue'
import {defaultTheme} from './theme/index'
import { SSvg } from './components'
const ovveridedTheme = computed<GlobalThemeOverrides>(() => ({
  ...defaultTheme,
  common: {
    // textColor2: 'red'
    primaryColor: '#006DA4',
    primaryColorHover: '#003554',
    primaryColorPressed: '#3b49ab',
    primaryColorSuppl: '#2A3593',
    infoColor: '#4D9B35',
    infoColorHover: '#367921',
    infoColorPressed: '#57aa3d',
    infoColorSuppl: '#4D9B35'
  },
  Checkbox: {
    colorChecked: '#4D9B35',
    borderChecked: 'solid 1px #4D9B35'
    // border
  },
  Radio: {
    colorActive: '#4D9B35',
    dotColorActive: '#ffffff',
    buttonBorderColorActive: 'solid 1px #4D9B35',
    buttonBorderColorHover: 'solid 1px #4D9B35'
  },
  Card: {
    titleFontSizeMedium: '20px',
    paddingMedium: '12px 24px'
    // paddingHuge: '0 0',
    // paddingLarge: '20px 20px',
    // paddingSmall: '0 0'
    // paddingHuge
  },
  Table: {
    thPaddingMedium: '16px 16px 8px',
    tdPaddingMedium: '8px 16px'
    // gapMedium: '0 0'
  },
  Tabs: {
    tabFontWeight: 600,
    tabFontWeightActive: 600,
    tabGapMediumCard: '0',
    tabGapMediumBar: '0',
    tabGapMediumLine: '0',
    tabGapMediumSegment: '0'
  }
}))
const placement = ref<MessageProviderProps['placement']>('top-right')
</script>

<template>
  <n-notification-provider>
    <n-dialog-provider>
      <n-message-provider :placement="placement">
        <n-config-provider :theme-overrides="ovveridedTheme">
          <router-view />
        </n-config-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-notification-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
