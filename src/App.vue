<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.main {
  background: rgb(26, 0, 70);
  background: linear-gradient(90deg, rgba(26, 0, 70, 0.8) 0%, rgba(23, 0, 77, 0.8) 100%);
  padding: 40px 20px;
}
</style>
