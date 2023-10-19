<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalShow"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div v-if="modalShow" class="p-4 bg-white self-start mt-32 max-w-screen-md z-50">
            <div class="flex justify-end p-2">
              <a href="#" class="text-gray-700" @click="$emit('modal-close')">
                <font-awesome-icon icon="fa-x" />
              </a>
            </div>
            <slot name="header" />
            <slot name="body" />
            <div class="w-full pt-4 px-3 flex justify-end">
              <slot name="confirm" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(['modal-close'])
defineProps({
  modalShow: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
