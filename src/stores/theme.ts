import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkTheme: false as boolean
  }),
  actions: {
    setDarkTheme(value: boolean) {
      this.isDarkTheme = value
    }
  }
})
