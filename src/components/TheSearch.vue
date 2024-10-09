<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { useDebounce } from '@vueuse/core'

const emit = defineEmits(['searchTermUpdated'])

const searchValue = ref('')
const debouncedSearchValue = useDebounce(searchValue, 300)

const updateValue = (event: Event) => {
  if (event.target !== null) {
    const target = event.target as HTMLInputElement
    searchValue.value = target.value
  }
}

watch(debouncedSearchValue, (newVal) => {
  emit('searchTermUpdated', newVal)
})
</script>

<template>
  <section class="search">
    <input
      type="text"
      :value="searchValue"
      @input="updateValue"
      placeholder="Search..."
      class="search-input"
    />
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/search';
</style>
