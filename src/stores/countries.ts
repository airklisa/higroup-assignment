import { defineStore } from 'pinia'
import axios from 'axios'
import type { Country } from '@/types/country.type'

const FAVORITES_KEY = 'favoriteCountries'

function loadFavorites(): string[] {
  const favorites = localStorage.getItem(FAVORITES_KEY)
  return favorites ? JSON.parse(favorites) : []
}

function saveFavorites(favorites: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as Country[],
    filteredCountries: [] as Country[],
    currentPage: 1,
    itemsPerPage: 15,
    favoriteCountries: loadFavorites() as string[],
    onlyFavorites: false as boolean
  }),
  actions: {
    async fetchCountries() {
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital,area,currencies,languages,borders'
      )
      this.countries = response.data
        .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))
        .map((country: Country) => ({
          ...country,
          isFavorite: this.favoriteCountries.includes(country.cca3)
        }))
      this.filteredCountries = this.countries
    },
    filterCountries(term?: string, region?: string) {
      this.filteredCountries = this.countries

      if (region) {
        this.filteredCountries = this.filteredCountries.filter(
          (country: Country) => country.region.toLowerCase() === region.toLowerCase()
        )
      }

      if (term) {
        this.filteredCountries = this.filteredCountries.filter((country: Country) =>
          country.name.common.toLowerCase().includes(term.toLowerCase())
        )
      }

      if (this.onlyFavorites) {
        this.filteredCountries = this.filteredCountries.filter(
          (country: Country) => country.isFavorite
        )
      }

      this.currentPage = 1
    },
    resetCountriesFilter() {
      this.filteredCountries = this.countries
      this.currentPage = 1
    },
    setPage(page: number) {
      this.currentPage = page
    },
    toggleOnlyFavoritesFilter() {
      this.onlyFavorites = !this.onlyFavorites
    },
    toggleFavoriteCountry(countryCode: string) {
      const index = this.favoriteCountries.indexOf(countryCode)

      if (index === -1) {
        this.favoriteCountries.push(countryCode)
      } else {
        this.favoriteCountries.splice(index, 1)
      }

      saveFavorites(this.favoriteCountries)

      const country = this.filteredCountries.find(
        (country: Country) => country.cca3 === countryCode
      )

      if (country) {
        country.isFavorite = !country.isFavorite
      }

      if (this.onlyFavorites) {
        this.filteredCountries = this.countries.filter((country: Country) => country.isFavorite)
      }
    }
  },
  getters: {
    getCountryByCode: (state) => (code: string) => {
      return state.countries.find((country: Country) => country.cca3 === code)
    },
    getCountryNameByCode: (state) => (code: string) => {
      return state.countries.find((country: Country) => country.cca3 === code)?.name.common
    },
    getPaginatedCountries: (state) => () => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.filteredCountries.slice(start, end)
    },
    getTotalPages: (state) => () => {
      return Math.ceil(state.filteredCountries.length / state.itemsPerPage)
    }
  }
})
