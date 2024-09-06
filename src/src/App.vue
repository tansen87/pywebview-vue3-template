<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="center-col h100 w100 scroll">
    <HelloWorld class="m30" msg="hi python" />
  </div>
</template>

<style>
.scroll {
  overflow: scroll;
  background-color: #F7F7F7;
  height: 100vh;
}

.logo-box span {
  width: 74px;
}
</style>
