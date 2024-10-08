<script setup lang="ts">
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['changePage'])
</script>

<template>
  <div class="pagination">
    <div class="pagination-controls">
      <button :disabled="currentPage === 1" @click="$emit('changePage', 'subtract')">&lt;</button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages" @click="$emit('changePage', 'add')">
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/pagination';
</style>
