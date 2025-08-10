<script setup lang="ts">

import {useRouter} from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="w-screen h-screen flex flex-col gap-5 justify-center items-center">
    <n-button type="primary" @click="router.back()">Back</n-button>
  </div>
</template>

<route lang="json5">
{
  meta: {
    layout: 'auth.layout'
  }
}
</route>