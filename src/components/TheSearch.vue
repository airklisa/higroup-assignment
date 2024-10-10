<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { useDebounce, onClickOutside } from '@vueuse/core'

const emit = defineEmits(['searchTermUpdated'])

const searchValue = ref('')
const debouncedSearchValue = useDebounce(searchValue, 300)
const targetRef = ref<HTMLElement | null>(null)
const isClickedOutside = ref(false)

const updateValue = (event: Event) => {
  if (event.target !== null) {
    const target = event.target as HTMLInputElement
    searchValue.value = target.value
    isClickedOutside.value = false
  }
}

onClickOutside(targetRef, () => {
  searchValue.value = ''
  isClickedOutside.value = true
})

watch(debouncedSearchValue, (newVal) => {
  if (!isClickedOutside.value) {
    emit('searchTermUpdated', newVal)
  }
})
</script>

<template>
  <section class="search">
    <input
      ref="targetRef"
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
