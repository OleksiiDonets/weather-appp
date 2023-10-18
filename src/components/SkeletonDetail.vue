<template>
  <div class="flex flex-col items-center py-5">
    <SkeletonItem class="w-1/4 bg-green-400" />
    <SkeletonItem class="w-3/4 h-10 my-5 bg-green-400" />
    <SkeletonItem class="rounded-full w-40 h-40 bg-green-400" />
  </div>
</template>
<script setup>
import SkeletonItem from '../components/SkeletonItem.vue'
</script>
