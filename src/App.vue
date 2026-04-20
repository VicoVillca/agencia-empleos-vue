<script setup lang="ts">
  import Menu from './components/Menu.vue';

</script>

<template>
  <Menu></Menu>
  <div class="container">
    <router-view></router-view>
  </div>

</template>

<style>
  body {
    background-color: #f8f9fa; /* bg-light de Bootstrap */
  }
</style>
