<script setup lang="ts"></script>
<template>
  <main class="min-h-[100vh-5rem] overflow-hidden">
    <div class="relative">
      <router-view />
    </div>
  </main>
</template>

<style lang="postcss">
.n-menu .n-menu-item-content::before {
  @apply !left-0 !right-0;
}
.n-menu .n-menu-item-content.n-menu-item-content--selected::before {
  @apply !left-3 !right-3 !top-2 !bottom-2;
}
.n-menu.n-menu--collapsed .n-menu-item-content.n-menu-item-content--selected::before {
  @apply !bg-[#D6DBFF] border border-[#BDBFD8];
}
.n-menu .n-menu-item {
  height: 3.5rem !important;
}
div .n-layout-toggle-button {
  @apply relative right-[10px] top-[1px];
}
</style>
