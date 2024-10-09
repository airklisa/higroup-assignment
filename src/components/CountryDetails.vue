<script setup lang="ts">
import type { PropType } from 'vue'
import type { Neighbors } from '@/types/neighbors.type'
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
  capital: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  currencies: {
    type: String,
    required: true
  },
  languages: {
    type: String,
    required: true
  },
  neighbors: {
    type: Array as PropType<Neighbors[]>,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: false,
    default: false
  }
})

defineEmits(['toggleFavorite', 'goBack'])
</script>

<template>
  <div class="country-details">
    <div class="country-details-content">
      <div class="name">
        <button @click="$emit('goBack')">&lt;</button>
        <h1>{{ name }}</h1>
        <FavoritesIcon @click="$emit('toggleFavorite')" :class="{ 'is-favorite': isFavorite }" />
      </div>
      <img :src="flag" :alt="name" />
      <div class="info">
        <div class="info-cell">
          <span>Region:</span>
          <span v-if="region">{{ region }}</span>
          <span v-else>None</span>
        </div>
        <div class="info-cell">
          <span>Population:</span>
          <span v-if="population">{{ population }}</span>
          <span v-else>None</span>
        </div>
        <div class="info-cell">
          <span>Capital:</span>
          <span v-if="capital">{{ capital }}</span>
          <span v-else>None</span>
        </div>
        <div class="info-cell">
          <span>Area:</span>
          <span v-if="area">{{ area }}km²</span>
          <span v-else>None</span>
        </div>
        <div class="info-cell">
          <span>Currencies:</span>
          <span v-if="currencies">{{ currencies }}</span>
          <span v-else>None</span>
        </div>
        <div class="info-cell">
          <span>Languages:</span>
          <span v-if="languages">{{ languages }}</span>
          <span v-else>None</span>
        </div>
      </div>
      <div class="neighbors">
        <span>Neighbors: </span>
        <div v-if="neighbors?.length">
          <RouterLink
            :to="`/country/${item.countryCode}`"
            v-for="(item, index) in neighbors"
            :key="index"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        <span v-else class="none"> None</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-details';
</style>
