<script setup lang="ts">
import FavoritesIcon from './FavoritesIcon.vue'

defineProps({
  flag: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: false,
    default: false
  }
})

defineEmits(['toggleFavorite'])
</script>

<template>
  <div class="country-card">
    <FavoritesIcon @click.stop="$emit('toggleFavorite')" :class="{ 'is-favorite': isFavorite }" />
    <div class="country-card-content">
      <div class="image-container">
        <div class="placeholder"></div>
        <img :src="flag" :alt="name" />
      </div>
      <p><span>Name:</span> {{ name }}</p>
      <p><span>Region:</span> {{ region }}</p>
      <p><span>Population:</span> {{ population }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-card';
</style>
