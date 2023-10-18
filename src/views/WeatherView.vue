<template>
  <div class="container">
    <Suspense>
      <template #default>
        <DetailCity />
      </template>
      <template #fallback>
        <SkeletonDetail />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import DetailCity from '../components/DetailCity.vue'
import SkeletonDetail from '../components/SkeletonDetail.vue'
</script>
