<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['updateSwitchValue'])

const isOn = ref(false)

const toggle = () => {
  isOn.value = !isOn.value
  emit('updateSwitchValue', isOn.value)
}
</script>

<template>
  <div class="slider" :class="{ 'slider-active': isOn }" @click="toggle">
    <div class="slider-button" :class="{ 'slider-button-active': isOn }"></div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/components/switch-slider';
</style>
