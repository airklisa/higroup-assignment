<script setup lang="ts">
import { ref, defineEmits, type PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    required: true
  },
  isDarkTheme: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['itemClicked'])

const show = ref<boolean>(false)
const selectedOption = ref<string>('')
const targetRef = ref<HTMLElement | null>(null)

const emitItemName = (item: string) => {
  show.value = false

  if (item !== selectedOption.value) {
    emit('itemClicked', item)
    selectedOption.value = item
    return
  }

  selectedOption.value = ''
  emit('itemClicked', selectedOption.value)
}

onClickOutside(targetRef, () => {
  show.value = false
})
</script>

<template>
  <div class="dropdown-wrapper" :class="{ 'dark-theme': isDarkTheme }" ref="targetRef">
    <button @click="show = !show">{{ selectedOption || 'Region' }}</button>
    <div v-if="show">
      <ul>
        <li v-for="item in items" :key="item" @click="emitItemName(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/dropdown';
</style>
