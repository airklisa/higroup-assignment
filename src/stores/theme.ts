import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkTheme: (localStorage.getItem('isDarkTheme') === 'true') as boolean
  }),
  actions: {
    setDarkTheme(value: boolean) {
      this.isDarkTheme = value
      localStorage.setItem('isDarkTheme', String(value))
    }
  }
})
