<template>
  <div v-if="isMobile" class="mobile">
    <div class="content">
      <img
        :src="require('@/assets/logo.svg')"
        width="72"
        height="72"
        alt="Chart Studio"
      />
      <p>We're sorry, Chart Studio currently only works on Desktop.</p>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const screenwidth = ref(window.innerWidth)
const isMobile = computed(() => {
  return screenwidth.value < 768
})

window.addEventListener('resize', () => {
  screenwidth.value = window.innerWidth
})
</script>

<style lang="css">
html {
  overflow-y: auto;
}
.v-tab {
  text-transform: none !important;
}

@media (max-width: 767px) {
  html,
  body,
  #app {
    height: 100%;
  }

  .mobile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;
  }
}
</style>
