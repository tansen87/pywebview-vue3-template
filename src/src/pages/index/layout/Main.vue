<template>
  <div id="main" class="p-5 w-full h-full overflow-auto">
    <Transition name="fade">
      <div :key="$route.fullPath" class="h-full">
        <RouterView />
      </div>
    </Transition>
    <el-backtop target="#main" />
  </div>
</template>

<style scoped>
.fade {
  &-enter-from, &-leave-to {
    @apply translate-x-[-30px] opacity-0;
  }
  &-leave-to {
    @apply absolute w-full;
  }
  &-enter-active, &-leave-active {
    @apply transition-all duration-500;
  }
}
</style>
