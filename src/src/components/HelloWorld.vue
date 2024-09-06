<template>
  <div class="center-col">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script setup>

defineProps({
  msg: String
})


</script>

<style scoped>
a {
  color: #42b983;
}
</style>
