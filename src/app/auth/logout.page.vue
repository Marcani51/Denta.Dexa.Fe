<script setup lang="ts">
const auth = useAuthStore()
auth.$reset()
useRouter().push('/auth/login')
</script>
<template><div></div></template>
